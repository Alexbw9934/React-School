import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              Inventory Requests
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell scope="col">Total Approved</CTableDataCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Pending</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Rejected</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              Leave Requests
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell scope="col">Total Approved</CTableDataCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Pending</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Rejected</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              Attendance
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell scope="col">Total Approved</CTableDataCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Pending</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Rejected</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              Service Requests
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell scope="col">Total Approved</CTableDataCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Pending</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Rejected</CTableHeaderCell>
                    <CTableDataCell scope="row">30</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
