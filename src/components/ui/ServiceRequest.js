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

const ServiceRequest = () => {
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const [serviceList, setServiceList] = useState([])
  const [delMsg, setDelMsg] = useState(false)
  useEffect(() => {
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get('/helpdesk.ticket', data)
        .then((response) => {
          console.log(response.data)
          setServiceList(response.data.results)
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
      .delete(`/helpdesk.ticket/${delId}`)
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
            <strong>Service Request</strong>
            <br />
            <Link to="/service-request/service-request-form">
              <CButton>Add New</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Issue Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {serviceList
                  .sort((a, b) => (a.id < b.id ? 1 : -1))
                  .map((data, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableHeaderCell scope="row">{data.ticket_type_id?.name}</CTableHeaderCell>
                        <CTableDataCell>{data?.name}</CTableDataCell>
                        <CTableDataCell>{data.department}</CTableDataCell>
                        <CTableDataCell>{data.email}</CTableDataCell>
                        <CTableDataCell>{data.designation}</CTableDataCell>
                        <CTableDataCell>
                          <Link
                            to="/service-request/service-request-form"
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
                  })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ServiceRequest
