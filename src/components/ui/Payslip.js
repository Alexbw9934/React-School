import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
} from '@coreui/react'
import http from './baseUrl'
import { useLocation } from 'react-router-dom'

const Payslip = () => {
  const [obj, setObj] = useState({ dateFrom: '', dateTo: '', leaveType: '' })
  const sess = localStorage.getItem('access_token')
  const location = useLocation()
  const [details, setDetails] = useState([{}])
  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sess, 'object')
    if (sess != '') {
      let data = {
        params: {
          holiday_status_id: 1,
          request_date_from: obj.dateFrom,
          request_date_to: obj.dateTo,
          name: obj.leaveType,
          employee_id: 1,
        },
      }
      http
        .post('/hr.payslip', data)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {})
    }
  }
  useEffect(() => {
    if (location.state != null) {
      console.log(location.state)
      http
        .get(`/hr.payslip/${location.state.from}`)
        .then((response) => {
          console.log(response.data, 'response from line')
          let data = response.data
          setObj({
            ...obj,
            employee: data?.employee_id.name,
            dateFrom: data.date_from,
            dateTo: data.date_to,
            batch: data.name,
          })
          const arr = [...details]
          response.data.line_ids.map((data1, i) => {
            arr[i] = {
              ...arr[i],
              id: data1.id,
              categoryId: data1.category_id.name,
              name: data1.name,
              quantity: data1.quantity,
              rate: data1.rate,
              amount: data1.total / data1.rate,
              total: data1.total,
            }
          })
          setDetails(arr)
        })
        .catch((error) => {})
    }
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Payslip</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Employee</CFormLabel>
                    <CFormInput type="text" disabled value={obj.employee || ''} />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Batch</CFormLabel>
                    <CFormInput type="text" disabled value={obj.batch || ''} />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Period From</CFormLabel>
                    <CFormInput type="date" disabled value={obj.dateFrom || ''} />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Period To</CFormLabel>
                    <CFormInput type="date" disabled value={obj.dateTo || ''} />
                  </div>
                </CCol>
              </CRow>
              <CCardHeader>
                <strong>Salary Computation</strong>
              </CCardHeader>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {details.map((data, i) => {
                    console.log(data, '$$$$$$$$$$')
                    return (
                      <CTableRow key={i}>
                        <CTableHeaderCell scope="row">
                          {' '}
                          <CFormInput type="text" disabled value={data.name || ''} />
                        </CTableHeaderCell>
                        <CTableDataCell>
                          <CFormInput type="text" disabled value={data.categoryId || ''} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput type="text" disabled value={data.quantity || ''} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput type="text" disabled value={data.rate || ''} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput type="text" disabled value={data.amount || ''} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput type="text" disabled value={data.total || ''} />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Payslip
