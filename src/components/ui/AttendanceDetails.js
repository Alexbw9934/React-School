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
import http from './baseUrl'

const AttendanceDetails = () => {
  const sess = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')
  const [attendanceList, setAttendanceList] = useState([])
  useEffect(() => {
    if (sess != '') {
      let data = {
        params: {
          login: username,
        },
      }
      http
        .get('/hr.attendance', data)
        .then((response) => {
          console.log(response.data)
          setAttendanceList(response.data.results)
        })
        .catch((error) => {})
    }
  }, [sess])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> Attendance Details </strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Attendance Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {attendanceList.map((data, i) => {
                  return (
                    <CTableRow key={i}>
                      <CTableHeaderCell scope="row">{data.date}</CTableHeaderCell>
                      <CTableDataCell>{data.status}</CTableDataCell>
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

export default AttendanceDetails
