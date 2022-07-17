import React, { useEffect, useState } from 'react'
import {
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

const TravelRequest = () => {
  const sess = localStorage.getItem('access_token')
  const employee = JSON.parse(localStorage.getItem('employee'))
  const username = localStorage.getItem('username')
  const [travelList, setTravelList] = useState([])
  useEffect(() => {
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get('/transportation.request', data)
        .then((response) => {
          console.log(response.data)
          setTravelList(response.data.results, 'travel')
        })
        .catch((error) => {})
      if (travelList.length > 0) {
        http
          .get(`/hr.employee/`)
          .then((response) => {
            console.log(response.data)
            setTravelList(response.data.results, 'travel')
          })
          .catch((error) => {})
      }
    }
  }, [sess])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Transportation Request</strong>
            <br />
            <Link to="/transportation-request/transportation-request-form">
              <CButton>Add New</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">From Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">To Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {travelList.length > 0 ? (
                  travelList
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .map((data, i) => {
                      return (
                        <CTableRow key={i}>
                          <CTableHeaderCell scope="row">{data.from_location}</CTableHeaderCell>
                          <CTableHeaderCell scope="row">{data.to_location}</CTableHeaderCell>
                          <CTableDataCell>{data?.employee_id?.name}</CTableDataCell>
                          <CTableDataCell>{data.employee_id?.department_id?.name}</CTableDataCell>
                          <CTableDataCell>{data.private_email}</CTableDataCell>
                          <CTableDataCell>{data.employee_id.job_title}</CTableDataCell>
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

export default TravelRequest
