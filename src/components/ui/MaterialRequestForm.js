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
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import http from './baseUrl'
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils'
import { setTimeout } from 'core-js'
import { useLocation } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilDelete, cilRecycle } from '@coreui/icons'
import SelectSearch from 'react-select-search'
import ReactSelect from 'react-select'

const MaterialRequestForm = (props) => {
  const employee = JSON.parse(localStorage.getItem('employee'))
  const uId = JSON.parse(localStorage.getItem('uId'))
  const [isLoading, setIsLoading] = useState(false)
  const [obj, setObj] = useState({
    createdBy: employee?.name,
    desig: employee?.job_title,
    phone: employee?.phone,
    email: employee?.private_email,
    department: employee?.department_id?.name,
    require_by: '',
  })
  const [msg, setMsg] = useState('')
  const sess = localStorage.getItem('access_token')
  const [data, setData] = useState({})
  const [details, setDetails] = useState([{ id: 0, quantity: 0, remarks: '' }])
  const addLine = () => {
    setDetails([...details, { id: 0, product: 0, stockQty: 0, quantity: 0, remarks: '' }])
  }
  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  }
  const handleChange2 = (e, i) => {
    const { name, value } = e.target
    let numberTableRows = [...details]
    numberTableRows[i] = {
      ...numberTableRows[i],
      [name]: value,
    }
    setDetails(numberTableRows)
  }
  const handleSelect = async (selectedOption, i) => {
    console.log(`Option selected:`, selectedOption)
    let numberTableRows = [...details]
    if (selectedOption.value == 'a5000') {
      setProductLoad(true)
      numberTableRows[i] = {
        ...numberTableRows[i],
        product: 0,
      }
      setTimeout(() => {
        setProductLoad(false)
      }, [5000])
    } else {
      numberTableRows[i] = {
        ...numberTableRows[i],
        product: selectedOption.value,
      }
      await http
        .get(`/product.product/qty_available/${selectedOption.value}/1`)
        .then((response) => {
          console.log(response.data.results.qty_available)
          numberTableRows[i] = {
            ...numberTableRows[i],
            stockQty: response.data.results.qty_available,
          }
        })
    }
    setDetails(numberTableRows)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sess, 'object')
    if (sess != '') {
      if (location.state) {
        let data = {
          params: {
            to_location: 1,
            require_by: obj.require_by,
            requestor_id: uId,
          },
        }
        http
          .put(`/material.request.inter.wh/${location.state.from}`, JSON.stringify(data))
          .then((response) => {
            console.log(response.data)
            if (details.length > 0) {
              details.map((value) => {
                http
                  .delete(`/material.request.inter.wh.line/${value.id}`)
                  .then((response) => {
                    console.log(response, 'delete response from line')
                  })
                  .catch((error) => {})
                let data = {
                  params: {
                    material_request_id: obj.id,
                    product_id: parseInt(value.product),
                    qty: parseInt(value.quantity),
                    remark: value.remarks,
                  },
                }
                http
                  .post(`/material.request.inter.wh.line`, data)
                  .then((response) => {
                    console.log(response, 'response from line')
                    setMsg('Added Successfully!')
                    setObj({
                      createdBy: employee?.name,
                      desig: employee?.job_title,
                      phone: employee?.phone,
                      email: employee?.private_email,
                      department: employee?.department_id?.name,
                      require_by: '',
                    })
                    setDetails([{ product: 0, quantity: 0, remarks: '' }])
                    setTimeout(() => {
                      setMsg('')
                    }, [5000])
                  })
                  .catch((error) => {})
              })
            }
          })
          .catch((error) => {})
      } else {
        let data = {
          params: {
            to_location: 1,
            require_by: obj.require_by,
            requestor_id: uId,
          },
        }
        http
          .post('/material.request.inter.wh', JSON.stringify(data))
          .then((response) => {
            console.log(response.data)
            if (details.length > 0) {
              details.map((value) => {
                let data = {
                  params: {
                    material_request_id: response.data.result.id,
                    product_id: parseInt(value.product),
                    qty: parseInt(value.quantity),
                    remark: value.remarks,
                  },
                }
                http
                  .post('/material.request.inter.wh.line', data)
                  .then((response) => {
                    console.log(response, 'response from line')
                    setMsg('Saved Successfully!')
                    setObj({ require_by: '' })
                    setDetails([{ product: 0, quantity: 0, remarks: '' }])
                    setTimeout(() => {
                      setMsg('')
                    }, [5000])
                  })
                  .catch((error) => {})
              })
            }
          })
          .catch((error) => {})
      }
    }
  }
  const [productList, setProductList] = useState([])
  const [productLoad, setProductLoad] = useState(false)
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const location = useLocation()
  useEffect(() => {
    console.log(uId, 'employree')
    if (location.state != null) {
      console.log(location.state)
      http
        .get(`/material.request.inter.wh/${location.state.from}`)
        .then((response) => {
          console.log(response.data, 'response from line')
          setData(response.data)
          setObj({ ...obj, id: response.data.id, require_by: response.data.require_by })
          const arr = [...details]
          response.data.material_request_inter_wh_line.map((data, i) => {
            arr[i] = {
              ...arr[i],
              id: data.id,
              product: data.product_id.id,
              quantity: data.qty,
              remarks: data.remark,
            }
          })
          setDetails(arr)
        })
        .catch((error) => {})
    }
    if (sess != '') {
      http
        .get('/product.product?limit=10')
        .then((response) => {
          console.log(response.data, 'product')
          setPage((prev) => prev + 1)
          let ob = { value: 0, label: '' }
          let arr = response.data.results.map((data, i, row) => {
            ob = {
              ...ob,
              value: data.id,
              label: data.name,
            }
            if (i + 1 == row.length) {
              ob = {
                ...ob,
                value: 'a5000',
                label: 'Load more...',
              }
            }
            return ob
          })
          setProductList(arr)
        })
        .catch((error) => {})
    }
  }, [])
  useEffect(() => {
    if (productLoad) {
      let offset = 10 * page
      http
        .get(`/product.product?offset=${offset}&limit=10`)
        .then((response) => {
          console.log(response.data, 'product')
          let ob = { value: 0, label: '' }
          let arr = response.data.results.map((data, i, row) => {
            ob = {
              ...ob,
              value: data.id,
              label: data.name,
            }
            if (i + 1 == row.length) {
              ob = {
                ...ob,
                value: 'a5000',
                label: 'Load more...',
              }
            }
            return ob
          })
          let val = productList.slice(0, -1)
          const children = val.concat(arr)
          setProductList(children)
          setPage((prev) => prev + 1)
          setProductLoad(false)
        })
        .catch((error) => {})
    }
  }, [productLoad])
  const removeClick = (i) => {
    console.log('clicked')
    let val = [...details]
    val.splice(i, 1)
    setDetails(val)
  }
  return (
    <CRow>
      <CCol xs={12}>
        {isLoading ? (
          <strong>Loading...</strong>
        ) : (
          <CCard className="mb-4">
            <CCardHeader>
              {msg && <CAlert color="success">{msg}</CAlert>}
              <strong>Material Request</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol>
                    <div className="mb-3">
                      <CFormLabel>MR Created By</CFormLabel>
                      <CFormInput type="text" disabled value={obj.createdBy || ''} />
                    </div>
                  </CCol>
                  <CCol>
                    <div className="mb-3">
                      <CFormLabel>MR Date</CFormLabel>
                      <CFormInput
                        type="date"
                        name="require_by"
                        value={obj.require_by || ''}
                        onChange={handleChange}
                      />
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
                      <CFormLabel>Next Approver</CFormLabel>
                      <CFormInput type="text" disabled />
                    </div>
                  </CCol>
                  <CCol>
                    <div className="mb-3">
                      <CFormLabel>Status</CFormLabel>
                      <CFormInput type="text" disabled />
                    </div>
                  </CCol>
                </CRow>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell style={{ width: '24%' }} scope="col">
                        Product
                      </CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '24%' }} scope="col">
                        Stock Quantity
                      </CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '24%' }} scope="col">
                        Quantity
                      </CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '24%' }} scope="col">
                        Remarks
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {details.map((data, i) => {
                      return (
                        <CTableRow key={i}>
                          <CTableHeaderCell scope="row">
                            {/* <CFormSelect
                              name="product"
                              onChange={(e) => handleChange2(e, i)}
                              value={data.product || ''}
                            >
                              <option value="0">-Select-</option>
                              {productList &&
                                productList.map((item, i) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.name}
                                    </option>
                                  )
                                })}
                              <option value="5000">Load more...</option>
                            </CFormSelect> */}
                            <ReactSelect
                              options={productList}
                              onChange={(val) => handleSelect(val, i)}
                            />
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <CFormInput
                              type="number"
                              disabled
                              name="stockQty"
                              value={data.stockQty || 0}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormInput
                              type="number"
                              name="quantity"
                              onChange={(e) => handleChange2(e, i)}
                              value={data.quantity || ''}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormInput
                              type="text"
                              name="remarks"
                              onChange={(e) => handleChange2(e, i)}
                              value={data.remarks || ''}
                            />
                          </CTableDataCell>
                          {i != 0 ? (
                            <CTableDataCell>
                              <CIcon icon={cilDelete} height={20} onClick={() => removeClick(i)} />
                            </CTableDataCell>
                          ) : null}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
                <div className="mb-3">
                  <CButton className="mb-3" onClick={() => addLine()}>
                    Add Line
                  </CButton>
                </div>
                <div className="mb-3">
                  <CButton type="submit">Submit</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        )}
      </CCol>
    </CRow>
  )
}

export default MaterialRequestForm
