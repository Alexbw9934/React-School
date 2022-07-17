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
import http from './baseUrl'
import { useLocation } from 'react-router-dom'

const LeaveRequestForm = () => {
  const sess = localStorage.getItem('access_token')
  const employee = JSON.parse(localStorage.getItem('employee'))
  const [leaveTypeList, setLeaveTypeList] = useState([])
  const [leaveList, setLeaveList] = useState([])
  const [msg, setMsg] = useState('')
  const [msg2, setMsg2] = useState('')
  const [obj, setObj] = useState({
    name: employee?.name,
    desig: employee?.job_title,
    phone: employee?.phone,
    email: employee?.private_email,
    department: employee?.department_id?.name,
    dateFrom: '',
    dateTo: '',
    leaveType: '',
    duration: '',
    description: '',
  })
  const handleChange = (e) => {
    console.log('change', e.target.value)
    setObj({ ...obj, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sess, 'object')
    let time = new Date(obj.dateTo).getTime() - new Date(obj.dateFrom).getTime()
    let val = Math.ceil(Math.abs(time) / (1000 * 60 * 60 * 24))
    if (sess != '') {
      if (
        leaveList.some(
          (item) => item.request_date_from === obj.dateFrom || item.request_date_to === obj.dateTo,
        )
      ) {
        setMsg2('Dates are alredy there please pick some other dates')
        setTimeout(() => {
          setMsg2('')
        }, [5000])
      } else {
        let data = {
          params: {
            holiday_status_id: parseInt(obj.leaveType),
            request_date_from: obj.dateFrom,
            request_date_to: obj.dateTo,
            name: employee.name,
            number_of_days: val,
            employee_id: employee.id,
          },
        }
        if (location.state != null) {
          http
            .put(`/hr.leave/${location.state.from}`, data)
            .then((response) => {
              console.log(response.data)
              setMsg('Updated Successfully!')
              setObj({
                name: employee?.name,
                desig: employee?.job_title,
                phone: employee?.phone,
                email: employee?.private_email,
                department: employee?.department_id?.name,
                dateFrom: '',
                dateTo: '',
                leaveType: '',
                duration: '',
                description: '',
              })
              setTimeout(() => {
                setMsg('')
              }, [5000])
            })
            .catch((error) => {})
        } else {
          http
            .post('/hr.leave', data)
            .then((response) => {
              console.log(response.data)
              setMsg('Added Successfully!')
              setObj({
                name: employee?.name,
                desig: employee?.job_title,
                phone: employee?.phone,
                email: employee?.private_email,
                department: employee?.department_id?.name,
                dateFrom: '',
                dateTo: '',
                leaveType: '',
                duration: '',
                description: '',
              })
              setTimeout(() => {
                setMsg('')
              }, [5000])
            })
            .catch((error) => {})
        }
      }
    }
  }
  const location = useLocation()
  useEffect(() => {
    console.log(employee, 'employree')
    http
      .get('/hr.leave')
      .then((response) => {
        console.log(response.data)
        setLeaveList(response.data.results)
      })
      .catch((error) => {})
    if (location.state != null) {
      console.log(location.state)
      http
        .get(`/hr.leave/${location.state.from}`)
        .then((response) => {
          console.log(response.data, 'response hr leave')
          setObj({
            ...obj,
            id: response.data.id,
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
      .get('/hr.leave.type')
      .then((response) => {
        console.log(response.data, 'from Leave Type')
        setLeaveTypeList(response.data.results)
      })
      .catch((error) => {})
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          {msg2 && <CAlert color="danger">{msg2}</CAlert>}
          {msg && <CAlert color="success">{msg}</CAlert>}
          <CCardHeader>
            <strong>Leave Request</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Leave Type</CFormLabel>
                    <CFormSelect
                      name="leaveType"
                      value={obj.leaveType || ''}
                      onChange={handleChange}
                    >
                      <option value="0">-Select-</option>
                      {leaveTypeList &&
                        leaveTypeList.map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.name}
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
                    <CFormInput type="text" disabled value={obj.department || ''} />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Designation</CFormLabel>
                    <CFormInput type="text" disabled value={obj.desig || ''} />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Phone No</CFormLabel>
                    <CFormInput type="text" disabled value={obj.phone || ''} />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput type="text" disabled value={obj.email || ''} />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Dates From</CFormLabel>
                    <CFormInput
                      type="date"
                      name="dateFrom"
                      value={obj.dateFrom || ''}
                      onChange={handleChange}
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Dates To</CFormLabel>
                    <CFormInput
                      type="date"
                      name="dateTo"
                      value={obj.dateTo || ''}
                      onChange={handleChange}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Duration</CFormLabel>
                    <CFormInput
                      type="text"
                      disabled
                      name="duration"
                      value={
                        Math.ceil(
                          Math.abs(
                            new Date(obj.dateTo).getTime() - new Date(obj.dateFrom).getTime(),
                          ) /
                            (1000 * 60 * 60 * 24),
                        ) || ''
                      }
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Description</CFormLabel>
                    <CFormTextarea
                      rows="3"
                      onChange={handleChange}
                      name="description"
                      value={obj.description || ''}
                    ></CFormTextarea>
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

export default LeaveRequestForm
