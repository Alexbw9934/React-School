import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { useLocation } from 'react-router-dom'
import http from './baseUrl'

const TravelRequestForm = () => {
  const sess = localStorage.getItem('access_token')
  const employee = JSON.parse(localStorage.getItem('employee'))
  const [purposeList, setPurposeList] = useState([])
  const [msg, setMsg] = useState('')
  const [obj, setObj] = useState({
    name: employee?.name,
    desig: employee?.job_title,
    phone: employee?.phone,
    email: employee?.private_email,
    department: employee?.department_id?.name,
    date: '',
    fromLocation: '',
    toLocation: '',
    oneWay: '',
    vehicleNo: '',
    type: '',
    timeOut: '',
    timeIn: '',
    driverName: '',
    driverMobile: 0,
    security: '',
    reason: '',
    purpose: 0,
  })
  const handleChange = (e) => {
    console.log('change', e.target.value)
    setObj({ ...obj, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sess, 'object')
    if (sess != '') {
      let data = {
        params: {
          travel_purpose_id: parseInt(obj.purpose),
          employee_id: employee.id,
          date_of_travel: obj.date,
          to_location: obj.toLocation,
          vehicle_no: obj.fromLocation,
          time_out: 5,
          driver_name: obj.driverName,
          security_guard_reqd: obj.security,
          from_location: obj.fromLocation,
          one_way_return: obj.oneWay,
          type: obj.type,
          time_in: 6,
          driver_mobile: obj.driverMobile,
          reason: obj.reason,
        },
      }
      if (location.state != null) {
        http
          .put(`/transportation.request/${location.state.from}`, data)
          .then((response) => {
            console.log(response.data)
            setMsg('Updated Successfully!')
            setObj({
              ...obj,
              date: '',
              fromLocation: '',
              toLocation: '',
              oneWay: '',
              vehicleNo: '',
              type: '',
              timeOut: '',
              timeIn: '',
              driverName: '',
              driverMobile: 0,
              security: '',
              reason: '',
              purpose: 0,
            })
            setTimeout(() => {
              setMsg('')
            }, [5000])
          })
          .catch((error) => {})
      } else {
        http
          .post('/transportation.request', data)
          .then((response) => {
            console.log(response.data)
            setMsg('Added Successfully!')
            setObj({
              ...obj,
              date: '',
              fromLocation: '',
              toLocation: '',
              oneWay: '',
              vehicleNo: '',
              type: '',
              timeOut: '',
              timeIn: '',
              driverName: '',
              driverMobile: 0,
              security: '',
              reason: '',
              purpose: 0,
            })
            setTimeout(() => {
              setMsg('')
            }, [5000])
          })
          .catch((error) => {})
      }
    }
  }
  const location = useLocation()
  useEffect(() => {
    console.log(employee, 'employree')
    if (location.state != null) {
      console.log(location.state)
      http
        .get(`/transportation.request/${location.state.from}`)
        .then((response) => {
          console.log(response.data, 'response hr leave')
          setObj({
            ...obj,
            id: response.data.id,
            purpose: response.data.travel_purpose_id.id,
            dateFrom: response.data.request_date_from,
            dateTo: response.data.request_date_to,
            leaveType: response.data.holiday_status_id.id,
            duration: response.data.number_of_days,
            description: response.data.name,
          })
        })
        .catch((error) => {})
    }
    http
      .get('/travel.purpose')
      .then((response) => {
        console.log(response.data, 'from Leave Type')
        setPurposeList(response.data.results)
      })
      .catch((error) => {})
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          {msg && <CAlert color="success">{msg}</CAlert>}
          <CCardHeader>
            <strong>Transportation Request</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Travel Purpose</CFormLabel>
                    <CFormSelect name="purpose" value={obj.purpose || ''} onChange={handleChange}>
                      <option value="0">-Select-</option>
                      {purposeList &&
                        purposeList.map((item, i) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          )
                        })}
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Name</CFormLabel>
                    <CFormInput type="text" disabled value={obj.name || ''} />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Department</CFormLabel>
                    <CFormInput type="text" value={obj.department || ''} disabled />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Designation</CFormLabel>
                    <CFormInput type="text" value={obj.desig || ''} disabled />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Phone No</CFormLabel>
                    <CFormInput type="text" value={obj.phone || ''} disabled />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput type="text" value={obj.email || ''} disabled />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Date of Travel</CFormLabel>
                    <CFormInput
                      type="date"
                      value={obj.date || ''}
                      onChange={handleChange}
                      name="date"
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>From Location</CFormLabel>
                    <CFormInput
                      type="text"
                      value={obj.fromLocation || ''}
                      onChange={handleChange}
                      name="fromLocation"
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>To Location</CFormLabel>
                    <CFormInput
                      type="text"
                      value={obj.toLocation || ''}
                      onChange={handleChange}
                      name="toLocation"
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>One way/Return</CFormLabel>
                    <CFormSelect onChange={handleChange} name="oneWay" value={obj.oneWay || ''}>
                      <option value="0">-Select-</option>
                      <option value="one_way">One Way</option>
                      <option value="return">Return</option>
                    </CFormSelect>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Vehicle No</CFormLabel>
                    <CFormInput
                      type="text"
                      onChange={handleChange}
                      name="vehicleNo"
                      value={obj.vehicleNo || ''}
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Type</CFormLabel>
                    <CFormInput
                      type="text"
                      onChange={handleChange}
                      name="type"
                      value={obj.type || ''}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Time Out</CFormLabel>
                    <CFormInput
                      type="time"
                      onChange={handleChange}
                      name="timeOut"
                      value={obj.timeOut || ''}
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Time In</CFormLabel>
                    <CFormInput
                      type="time"
                      onChange={handleChange}
                      name="timeIn"
                      value={obj.timeIn || ''}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Driver&apos;s Name</CFormLabel>
                    <CFormInput
                      type="text"
                      onChange={handleChange}
                      name="driverName"
                      value={obj.driverName || ''}
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Driver&apos;s Mobile No</CFormLabel>
                    <CFormInput
                      type="text"
                      onChange={handleChange}
                      name="driverMobile"
                      value={obj.driverMobile || ''}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Security Guard Reqd</CFormLabel>
                    <CFormInput
                      type="text"
                      onChange={handleChange}
                      name="security"
                      value={obj.security || ''}
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Reason</CFormLabel>
                    <CFormInput
                      type="text"
                      onChange={handleChange}
                      name="reason"
                      value={obj.reason || ''}
                    />
                  </div>
                </CCol>
              </CRow>
              <div className="mb-3">
                <CButton type="submit">Submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TravelRequestForm
