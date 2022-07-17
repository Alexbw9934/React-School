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

const LeaveRequest = () => {
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const [leaveList, setLeaveList] = useState([])
  const [delMsg, setDelMsg] = useState(false)
  useEffect(() => {
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get(`/hr.leave`, data)
        .then((response) => {
          console.log(response.data, username, 'leaverequest')
          setLeaveList(response.data.results)
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
      .delete(`/hr.leave/${delId}`)
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
            <strong>Leave Request</strong>
            <br />
            <Link to="/leave-request/leave-request-form">
              <CButton>Add New</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Time Off Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {leaveList.length > 0 ? (
                  leaveList
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .map((data, i) => {
                      return (
                        <CTableRow key={i}>
                          <CTableHeaderCell scope="row">
                            {data.holiday_status_id?.name}
                          </CTableHeaderCell>
                          <CTableDataCell>{data.name}</CTableDataCell>
                          <CTableDataCell>{data.request_date_from}</CTableDataCell>
                          <CTableDataCell>{data.request_date_to}</CTableDataCell>
                          <CTableDataCell>{data.number_of_days}</CTableDataCell>
                          {data.state == 'validate' ? (
                            <CTableDataCell>
                              {' '}
                              <CButton style={{ backgroundColor: 'green' }}>To Approve</CButton>
                            </CTableDataCell>
                          ) : (
                            <CTableDataCell>
                              <CButton
                                style={{
                                  backgroundColor: 'yellow',
                                  color: 'black',
                                  borderColor: 'yellow',
                                }}
                              >
                                Approved
                              </CButton>
                            </CTableDataCell>
                          )}
                          <CTableDataCell>
                            <Link to="/leave-request-form" state={{ from: `${data.id}` }}>
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

export default LeaveRequest
