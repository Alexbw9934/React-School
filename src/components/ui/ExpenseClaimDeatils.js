import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import http from './baseUrl'

const ExpenseClaimDeatils = () => {
  const [expenseList, setExpenseList] = useState([])
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const [delMsg, setDelMsg] = useState(false)
  useEffect(() => {
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get('/hr.expense', data)
        .then((response) => {
          console.log(response.data)
          setExpenseList(response.data.results, 'expense list')
        })
        .catch((error) => {})
    }
  }, [sess, delMsg])
  const [delId, setDelId] = useState(0)
  const [show, setShow] = useState(false)
  const handleOpen = (id) => {
    setDelId(id)
    setShow(true)
  }
  const handleClose = () => {
    setDelId(0)
    setShow(false)
  }
  const handleDelete = () => {
    http
      .delete(`/hr.expense/${delId}`)
      .then((response) => {
        console.log(response.data, 'response from Delete')
        setShow(false)
        setDelMsg(true)
        setTimeout(() => {
          setDelMsg(false)
        }, [5000])
        setDelId(0)
      })
      .catch((error) => {})
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          {delMsg && <CAlert color="success">Deleted Succcessfully!</CAlert>}
          {show && (
            <DeleteModal visible={show} handleClose={handleClose} handleDelete={handleDelete} />
          )}
          <CCardHeader>
            <strong>Expense Claim</strong>
            <br />
            <Link to="/expense-claim-details/expense-claim">
              <CButton>Add New</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Claim No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Claim Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Submitted To</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {expenseList.length > 0 ? (
                  expenseList
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .map((data, i) => {
                      return (
                        <CTableRow key={i}>
                          <CTableHeaderCell scope="row">{data.id}</CTableHeaderCell>
                          <CTableDataCell>{data.date}</CTableDataCell>
                          <CTableDataCell>{data?.employee_id?.name}</CTableDataCell>
                          <CTableDataCell>{data.submittedTo}</CTableDataCell>
                          <CTableDataCell>{data.location}</CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to="/expense-claim-details/expense-claim"
                              state={{ from: `${data.id}` }}
                            >
                              <CButton>Edit</CButton>
                            </Link>
                            &nbsp;
                            <CButton onClick={() => handleOpen(data.id)} color="danger">
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })
                ) : (
                  <CTableDataCell>Loading...</CTableDataCell>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExpenseClaimDeatils
