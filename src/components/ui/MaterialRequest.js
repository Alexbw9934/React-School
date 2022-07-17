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
import http from './baseUrl'
import DeleteModal from './DeleteModal'

const MaterialRequest = () => {
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const employee = JSON.parse(localStorage.getItem('employee'))
  const [materialList, setMaterialList] = useState([])
  const [delMsg, setDelMsg] = useState(false)
  const [approveMsg, setApproveMsg] = useState(false)
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
  }, [sess, delMsg, approveMsg])
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
  const approval = (id) => {
    console.log('clicked')
    http
      .post(`/material.request.inter.wh/send_for_approval/${id}`)
      .then((response) => {
        setApproveMsg(true)
        setTimeout(() => {
          setApproveMsg(false)
        }, [5000])
      })
      .catch((error) => {})
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          {delMsg && <CAlert color="success">Deleted Succcessfully!</CAlert>}
          {approveMsg && <CAlert color="success">Send for Approval Succcessfully!</CAlert>}
          {show && (
            <DeleteModal visible={show} handleClose={handleClose} handleDelete={handleDelete} />
          )}
          <CCardHeader>
            <strong>Material Request</strong>
            <br />
            <Link to="/all-material-requests/material-request-form">
              <CButton>Add New</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">MR ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">MR Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">On Behalf of</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Next Approver</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Approve By</CTableHeaderCell> */}
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
                          <CTableDataCell>
                            {data.state == 'draft'
                              ? 'Draft'
                              : data.state == 'approved'
                              ? 'Approved'
                              : 'Send for Approval'}
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to="/all-material-requests/material-request-form"
                              state={{ from: `${data.id}` }}
                            >
                              <CButton>Edit</CButton>
                            </Link>
                            &nbsp;
                            {data.state == 'draft' ? (
                              <CButton onClick={() => approval(data.id)} color="warning">
                                Submit for Approval
                              </CButton>
                            ) : null}
                            &nbsp;
                            <CButton color="danger" onClick={() => handleOpen(data.id)}>
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

export default MaterialRequest
