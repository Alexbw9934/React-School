import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAvTimer,
  cilBell,
  cilCalculator,
  cilCalendar,
  cilCarAlt,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilEnvelopeLetter,
  cilMoney,
  cilNoteAdd,
  cilNotes,
  cilPenAlt,
  cilPencil,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilStar,
  cilTruck,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Material Request',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Material Requests',
        to: '/all-material-requests',
      },
      {
        component: CNavItem,
        name: 'Pending for Approval',
        to: '/pending-for-approval',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Leave Request',
    to: '/leave-request',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Service Request',
    to: '/service-request',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payslip',
    to: '/payslip-detail',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Attendance Details',
    to: '/attendance-details',
    icon: <CIcon icon={cilPenAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transportation Request',
    to: '/transportation-request',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Expense Claim',
    to: '/expense-claim-details',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
]

export default _nav
