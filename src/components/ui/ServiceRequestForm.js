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
import { cifBj } from '@coreui/icons'
const ServiceRequestForm = () => {
  const sess = localStorage.getItem('access_token')
  const employee = JSON.parse(localStorage.getItem('employee'))
  const [issueList, setIssueList] = useState([])
  const [ticketList, setTicketList] = useState([])
  const [msg, setMsg] = useState('')
  const [obj, setObj] = useState({
    name: employee?.name,
    desig: employee?.job_title,
    phone: employee?.phone,
    email: employee?.private_email,
    department: employee?.department_id?.name,
    description: '',
    issue: 0,
    team: 0,
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
          name: obj.name,
          team_id: parseInt(obj.team),
          ticket_type_id: parseInt(obj.issue),
          user_id: 1,
          partner_id: 1,
          description: obj.description,
        },
      }
      if (location.state != null) {
        http
          .put(`/helpdesk.ticket/${location.state.from}`, data)
          .then((response) => {
            console.log(response.data)
            setMsg('Updated Successfully!')
            setObj({
              ...obj,
              description: '',
              issue: 0,
              team: 0,
            })
            setTimeout(() => {
              setMsg('')
            }, [5000])
          })
          .catch((error) => {})
      } else {
        http
          .post('/helpdesk.ticket', JSON.stringify(data))
          .then((response) => {
            console.log(response.data)
            setMsg('Added Successfully!')
            setObj({
              ...obj,
              description: '',
              issue: 0,
              team: 0,
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
        .get(`/helpdesk.ticket/${location.state.from}`)
        .then((response) => {
          console.log(response.data, 'response hservice leave')
          setObj({
            ...obj,
            team: response.data.team_id.id,
            description: response.data.description,
          })
        })
        .catch((error) => {})
    }
    http
      .get('/helpdesk.team')
      .then((response) => {
        console.log(response.data, 'from Leave Type')
        setIssueList(response.data.results)
      })
      .catch((error) => {})
    http
      .get('/helpdesk.ticket.type')
      .then((response) => {
        console.log(response.data, 'from Leave Type')
        setTicketList(response.data.results)
      })
      .catch((error) => {})
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          {msg && <CAlert color="success">{msg}</CAlert>}
          <CCardHeader>
            <strong>Service Request</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Issue Category</CFormLabel>
                    <CFormSelect name="issue" value={obj.issue || ''} onChange={handleChange}>
                      <option value="0">-Select-</option>
                      {ticketList &&
                        ticketList.map((data) => {
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
                    <CFormLabel>Help desk Team</CFormLabel>
                    <CFormSelect
                      name="team"
                      onChange={(e) => handleChange(e)}
                      value={obj.team || ''}
                    >
                      <option value="0">-Select-</option>
                      {issueList &&
                        issueList.map((item, i) => {
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
                    <CFormLabel>Description</CFormLabel>
                    <CFormTextarea
                      rows="3"
                      onChange={handleChange}
                      value={obj.description || ''}
                      name="description"
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

export default ServiceRequestForm
