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
import http from './baseUrl'
import DeleteModal from './DeleteModal'

const PayslipDetails = () => {
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const [paySlipList, setPaySlipList] = useState([])
  const [delMsg, setDelMsg] = useState(false)
  useEffect(() => {
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get('/hr.payslip', data)
        .then((response) => {
          console.log(response.data, 'response from payslip')
          setPaySlipList(response.data.results)
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
      .delete(`/hr.payslip/${delId}`)
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
            <strong>Payslip</strong>
            <br />
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Batch</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Period From</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Period To</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {paySlipList.length > 0 ? (
                  paySlipList.map((data, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableHeaderCell scope="row">{data?.employee_id?.name}</CTableHeaderCell>
                        <CTableDataCell>{data.name}</CTableDataCell>
                        <CTableDataCell>{data.date_from}</CTableDataCell>
                        <CTableDataCell>{data.date_to}</CTableDataCell>
                        <CTableDataCell>
                          <Link to="/payslip" state={{ from: `${data.id}` }}>
                            <CButton>View</CButton>
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
                  <CTableRow>
                    <CTableDataCell colSpan={8}>Loading...</CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PayslipDetails
