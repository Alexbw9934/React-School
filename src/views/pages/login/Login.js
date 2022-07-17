import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGmail, cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [obj, setObj] = useState({ login: '', password: '' })
  const [detail, setDetail] = useState({})
  const [imgUrl, setImgUrl] = useState()
  const [statusMsg, setStatusMsg] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let params = {}
    let data = {
      params: {
        username: obj.login,
        password: obj.password,
        db: 'prometheus02',
      },
    }
    axios({
      method: 'post',
      url: 'https://prometheus.verts.co.in/api/auth/get_tokens',
      data: data,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }).then((res) => {
      console.log(res, 'response from authenticate')
      if (res.data.result.access_token) {
        localStorage.setItem('access_token', res.data.result.access_token)
        localStorage.setItem('username', obj.login)
        localStorage.setItem('uId', res.data.result.uid)
        axios
          .get(`https://prometheus.verts.co.in/api/hr.employee/by_user/${obj.login}`)
          .then((response) => {
            console.log(response, 'response from ')
          })
          .catch((error) => {
            console.log(error)
          })
        navigate('/dashboard')
      } else {
        setStatusMsg(true)
        setTimeout(() => {
          setStatusMsg(false)
        }, 5000)
      }
    })
  }
  useEffect(() => {
    axios
      .get(`https://prometheus.verts.co.in/api/res.company`)
      .then((response) => {
        console.log(response.data.results[0], 'username')
        setDetail(response.data.results[0])
      })
      .catch((error) => {})
  }, [])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                {statusMsg && <p className="text-danger">Username or Password is incorrect</p>}
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        type="text"
                        name="login"
                        value={obj.login || ''}
                        onChange={(e) => handleChange(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={obj.password || ''}
                        onChange={(e) => handleChange(e)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={`data:image/png;base64,${detail.logo}`} />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
