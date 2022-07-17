import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import '../../scss/style.css'
import http from './baseUrl'
import { setTimeout } from 'core-js'
import { useLocation } from 'react-router-dom'

const ExpenseClaim = () => {
  const sess = localStorage.getItem('access_token')
  const [msg, setMsg] = useState('')
  const location = useLocation()
  const employee = JSON.parse(localStorage.getItem('employee'))
  const [obj, setObj] = useState({
    claimNo: 0,
    claimDate: '',
    employee: employee?.name,
    submittedTo: '',
    location: '',
    department: employee?.department_id?.name,
    charge: false,
    notes: '',
    expenseType: '',
    billNo: '',
    billAvl: '',
    paidDire: '',
    amount: '',
    totalAmount: '',
    lessAdvncAmnt: '',
    lesPaid: '',
    dueAmnt: '',
  })
  const [data, setData] = useState({ expenseAmount: '', expenseDate: '' })
  const [categoryList, setCategoryList] = useState([])
  const [visible, setVisible] = useState(false)
  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleClose = () => {}
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sess, 'object')
    if (sess != '') {
      let data = {
        params: {
          name: employee.name,
          description: obj.notes,
          total_amount: obj.totalAmount,
          product_id: parseInt(obj.product),
          employee_id: employee.id,
          date: obj.claimDate,
          company_id: 1,
        },
      }
      if (location.state != null) {
        http
          .put(`/hr.expense/${location.state.from}`, data)
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
          .post('/hr.expense', data)
          .then((response) => {
            console.log(response.data)
            setMsg('Added Successfully!')
            setObj({
              ...obj,
              claimNo: 0,
              claimDate: '',
              employee: employee?.name,
              submittedTo: '',
              location: '',
              department: employee?.department_id?.name,
              charge: false,
              notes: '',
              expenseType: '',
              billNo: '',
              billAvl: '',
              paidDire: '',
              amount: '',
              totalAmount: '',
              lessAdvncAmnt: '',
              lesPaid: '',
              dueAmnt: '',
            })
            setTimeout(() => {
              setMsg('')
            }, [5000])
          })
          .catch((error) => {})
      }
    }
  }
  useEffect(() => {
    if (sess != '') {
      if (location.state != null) {
        console.log(location.state)
        http
          .get(`/hr.expense/${location.state.from}`)
          .then((response) => {
            console.log(response.data, 'response hr leave')
            let data = response.data
            setObj({
              ...obj,
              name: data.employee_id.name,
              notes: data.description,
              totalAmount: data.total_amount,
              product: data.product_id.id,
              claimDate: data.date,
            })
          })
          .catch((error) => {})
      }
      http
        .get(`/hr.expense.category`)
        .then((response) => {
          console.log(response.data, 'expensecategory')
          setCategoryList(response.data.results)
        })
        .catch((error) => {})
    }
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            {msg && <CAlert color="success">{msg}</CAlert>}
            <strong>Expense Claim Details</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Claim No</CFormLabel>
                    <CFormInput type="text" value={obj.claimNo || ''} disabled />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Claim Date</CFormLabel>
                    <CFormInput
                      type="date"
                      name="claimDate"
                      onChange={handleChange}
                      value={obj.claimDate || ''}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Employee</CFormLabel>
                    <CFormInput type="text" value={obj.employee || ''} disabled />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Submitted To</CFormLabel>
                    <CFormInput type="text" value={obj.submittedTo || ''} disabled />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Location</CFormLabel>
                    <CFormInput type="text" value={obj.location || ''} disabled />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Department</CFormLabel>
                    <CFormInput type="text" value={obj.department || ''} disabled />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Amount Paid</CFormLabel>
                    <CFormInput
                      type="number"
                      name="totalAmount"
                      onChange={handleChange}
                      value={obj.totalAmount || ''}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Category</CFormLabel>
                    <CFormSelect
                      name="product"
                      onChange={(e) => handleChange(e)}
                      value={obj.product || ''}
                    >
                      <option value="0">-Select-</option>
                      {categoryList &&
                        categoryList.map((item, i) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          )
                        })}
                    </CFormSelect>
                  </div>
                </CCol>
                {/* <CCol>
                  <div className="mb-3">
                    <CFormLabel>Charge to Customer</CFormLabel>&nbsp;
                    <CFormCheck
                      checked={obj.charge}
                      onChange={(e) => setObj({ ...obj, charge: e.target.checked })}
                    />
                  </div> */}
                {/* <div className="mb-3">
                    <CButton
                      onClick={() => {
                        setVisible(true)
                      }}
                    >
                      Add new Expense
                    </CButton>
                  </div> */}
                {/* </CCol> */}
                <CCol>
                  <div className="mb-3">
                    <CFormLabel>Notes</CFormLabel>
                    <CFormTextarea
                      rows="3"
                      name="notes"
                      onChange={handleChange}
                      value={obj.notes || ''}
                    ></CFormTextarea>
                  </div>
                </CCol>
              </CRow>
              {/* <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Expense Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Bill No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Bill Available</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Paid Directly By Company</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                      <CFormInput
                        type="text"
                        name="expenseType"
                        onChange={handleChange}
                        value={obj.expenseType || ''}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        name="billNo"
                        onChange={handleChange}
                        value={obj.billNo || ''}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        onChange={handleChange}
                        name="billAvl"
                        value={obj.billAvl || ''}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        onChange={handleChange}
                        name="paidDire"
                        value={obj.paidDire || ''}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        onChange={handleChange}
                        name="amount"
                        value={obj.amount || ''}
                      />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable> */}
              {/* <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Less Advance Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Less Paid By Company</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Due Amount</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                      <CFormInput
                        type="number"
                        onChange={handleChange}
                        name="totalAmount"
                        value={obj.totalAmount || ''}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <CFormInput
                        type="number"
                        onChange={handleChange}
                        name="lessAdvncAmnt"
                        value={obj.lessAdvncAmnt || ''}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        onChange={handleChange}
                        name="lesPaid"
                        value={obj.lesPaid || ''}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        onChange={handleChange}
                        name="dueAmnt"
                        value={obj.dueAmnt || ''}
                      />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable> */}
              <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader></CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Expense Amount</CFormLabel>
                        <CFormSelect
                          name="expenseAmount"
                          onChange={() => handleChange}
                          value={data.expenseAmount}
                        >
                          <option>-Select-</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Expense Date</CFormLabel>
                        <CFormInput
                          type="date"
                          name="expenseDate"
                          onChange={() => handleChange}
                          value={data.expenseDate || ''}
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Bill Available</CFormLabel>&nbsp;
                        <CFormCheck
                          name="billAvl"
                          onChange={() => handleChange}
                          value={data.billAvl || ''}
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Bill No</CFormLabel>
                        <CFormInput
                          type="number"
                          name="billNo"
                          onChange={() => handleChange}
                          value={data.billNo || ''}
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Cost Code</CFormLabel>
                        <CFormSelect
                          name="costCode"
                          onChange={() => handleChange}
                          value={data.costCode || ''}
                        >
                          <option>-Select-</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>BA Code</CFormLabel>
                        <CFormSelect
                          name="baCode"
                          onChange={() => handleChange}
                          value={data.baCode || ''}
                        >
                          <option>-Select-</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel> Amount</CFormLabel>
                        <CFormSelect
                          name="amount"
                          onChange={() => handleChange}
                          value={data.amount || ''}
                        >
                          <option>-Select-</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Paid Directly By Company</CFormLabel>&nbsp;
                        <CFormCheck
                          name="paid"
                          onChange={() => handleChange}
                          value={data.paid || ''}
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Narration</CFormLabel>
                        <CFormTextarea
                          name="narration"
                          onChange={() => handleChange}
                          value={data.narration || ''}
                        ></CFormTextarea>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel>Attachment</CFormLabel>
                        <CFormInput
                          type="file"
                          name="attachment"
                          onChange={() => handleChange}
                          value={data.attachment || ''}
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => handleClose}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={() => setVisible(false)}>
                    Save changes
                  </CButton>
                </CModalFooter>
              </CModal>
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

export default ExpenseClaim
