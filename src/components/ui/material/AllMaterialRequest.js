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
import axios from 'axios'
import http from '../baseUrl'
import DeleteModal from '../DeleteModal'

const AllMaterialRequest = () => {
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const employee = JSON.parse(localStorage.getItem('employee'))
  const [materialList, setMaterialList] = useState([])
  const [delMsg, setDelMsg] = useState(false)
  useEffect(() => {
    console.log(employee, 'employee')
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get('/material.request.inter.wh', data)
        .then((response) => {
          console.log(response.data)
          setMaterialList(response.data.results)
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
      .delete(`/material.request.inter.wh/${delId}`)
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
            <strong>Material Request</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">MR ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">MR Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">On Behalf of</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Next Approver</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Approve By</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {materialList.length > 0 ? (
                  materialList
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .map((data, i) => {
                      return (
                        <CTableRow key={i}>
                          <CTableDataCell>{data.name}</CTableDataCell>
                          <CTableDataCell>{data.require_by}</CTableDataCell>
                          <CTableDataCell>{data.partner_id.name}</CTableDataCell>
                          <CTableDataCell>{employee?.department_id?.name}</CTableDataCell>
                          <CTableDataCell>Otto</CTableDataCell>
                          <CTableDataCell>Otto</CTableDataCell>
                          <CTableDataCell>Otto</CTableDataCell>
                          <CTableDataCell>{data.state}</CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to="/all-material-requests/material-request-form"
                              state={{ from: `${data.id}` }}
                            >
                              <CButton>Edit</CButton>
                            </Link>
                            &nbsp;
                            <CButton
                              onClick={() => handleOpen(data.id)}
                              style={{ backgroundColor: 'red' }}
                            >
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

export default AllMaterialRequest
