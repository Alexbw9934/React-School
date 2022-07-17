import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilArrowCircleRight,
  cilArrowLeft,
  cilBell,
  cilCaretBottom,
  cilCheck,
  cilCheckAlt,
  cilChevronDoubleLeft,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilShieldAlt,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import checkIn from '../assets/images/checkin2.png'
import checkOut from '../assets/images/chekoutimg.png'
import http from './ui/baseUrl'

const AppHeader = () => {
  const employee = JSON.parse(localStorage.getItem('employee'))
  const username = localStorage.getItem('username')
  const dispatch = useDispatch()
  const [msg, setMsg] = useState(false)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [emp, setEmp] = useState({})
  useEffect(() => {
    if (msg) {
      handleCheck()
    }
  }, [msg])
  useEffect(() => {
    getEmployee()
  }, [msg])
  const getEmployee = () => {
    http
      .get(`/hr.employee/by_user/${username}`)
      .then((response) => {
        console.log(response.data, 'employee list')
        setEmp(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleCheck = () => {
    let data = {
      params: {
        employee_id: emp?.id,
      },
    }
    http
      .post(`/hr.attendance`, data)
      .then((response) => {
        console.log(response.data, 'response from CheckIN')
        setMsg(false)
      })
      .catch((error) => {})
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {emp?.attendance_state == 'checked_out' ? (
            <CNavItem>
              <CNavLink onClick={() => setMsg(true)}>
                <img src={checkOut} style={{ width: '20px' }} /> Checked In{' '}
              </CNavLink>
            </CNavItem>
          ) : (
            <CNavItem>
              <CNavLink onClick={() => setMsg(true)}>
                <img src={checkIn} style={{ width: '20px' }} /> Checked Out{' '}
              </CNavLink>
            </CNavItem>
          )}
          <CNavItem>
            {emp?.attendance_state == 'checked_out' ? (
              <CAlert color="danger" style={{ lineHeight: '5px', width: '500px' }}>
                You are Checked Out
              </CAlert>
            ) : (
              <CAlert color="success" style={{ lineHeight: '5px', width: '500px' }}>
                You are Checked In
              </CAlert>
            )}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
