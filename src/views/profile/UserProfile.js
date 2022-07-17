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
import profile from '../../assets/images/avatars/7.jpg'
import { Link } from 'react-router-dom'
import http from '../../components/ui/baseUrl'

const UserProfile = () => {
  const sess = localStorage.getItem('access_token')
  const employee = JSON.parse(localStorage.getItem('employee'))
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={6} lg={6}>
                <h2 style={{ textAlign: 'center', marginBottom: '4px' }}>{employee?.name}</h2>
                <span className="fs-6 fw-normal center" style={{ marginBottom: '10px' }}>
                  I&apos;m an engineer in love with photography,painting and discovering new things
                  world and cultures
                </span>
                <h4 style={{ marginBottom: '4px', marginTop: '10px' }}>General Info</h4>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
                      <CTableDataCell scope="row">{employee?.date}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                      <CTableDataCell scope="row">{employee?.mobile_phone}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      <CTableDataCell scope="row">{employee?.work_email}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                      <CTableDataCell scope="row">{employee?.department_id?.name}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCol>
              <CCol sm={6} lg={6}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <img src={profile} style={{ borderRadius: '50%' }} />
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserProfile
