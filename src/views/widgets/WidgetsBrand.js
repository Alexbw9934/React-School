import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilEnvelopeLetter, cilNotes, cilSettings } from '@coreui/icons'

const WidgetsBrand = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          icon={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CIcon icon={cilNotes} height={52} className="my-4 text-white" />
              <span className="fs-4 fw-normal text-white ">Material Requests</span>
            </div>
          }
          values={[
            { title: 'Total', value: '89K' },
            { title: 'Approved', value: '89K' },
            // { title: '', value: '' },
            { title: 'Pending', value: '459' },
          ]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          icon={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CIcon icon={cilSettings} height={52} className="my-4 text-white" />
              <span className="fs-4 fw-normal text-white ">Service Requests</span>
            </div>
          }
          values={[
            { title: 'Total', value: '89K' },
            { title: 'Approved', value: '89K' },
            { title: 'Pending', value: '459' },
          ]}
          style={{
            '--cui-card-cap-bg': '#00aced',
          }}
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          icon={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CIcon icon={cilCalendar} height={52} className="my-4 text-white" />
              <span className="fs-4 fw-normal text-white ">Leave Requests</span>
            </div>
          }
          values={[
            { title: 'Total', value: '89K' },
            { title: 'Approved', value: '89K' },
            { title: 'Pending', value: '459' },
          ]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          color="warning"
          icon={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CIcon icon={cilEnvelopeLetter} height={52} className="my-4 text-white" />
              <span className="fs-4 fw-normal text-white ">Expense Claim</span>
            </div>
          }
          values={[
            { title: 'Total', value: '89K' },
            { title: 'Approved', value: '89K' },
            { title: 'Pending', value: '459' },
          ]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
