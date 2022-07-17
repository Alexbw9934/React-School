import React from 'react'
import componentLoader from './componentLoader'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MaterialRequest = React.lazy(() =>
  componentLoader(() => import('./components/ui/MaterialRequest')),
)
const MaterialRequestForm = React.lazy(() =>
  componentLoader(() => import('./components/ui/MaterialRequestForm')),
)
const LeaveRequest = React.lazy(() => componentLoader(() => import('./components/ui/LeaveRequest')))
const LeaveRequestForm = React.lazy(() =>
  componentLoader(() => import('./components/ui/LeaveRequestForm')),
)
const ServiceRequest = React.lazy(() => import('./components/ui/ServiceRequest'))
const ServiceRequestForm = React.lazy(() => import('./components/ui/ServiceRequestForm'))
const Payslip = React.lazy(() => import('./components/ui/Payslip'))
const PayslipDetails = React.lazy(() => import('./components/ui/PayslipDetails'))
const Attendance = React.lazy(() => import('./components/ui/AttendanceDetails'))
const TravelRequest = React.lazy(() => import('./components/ui/TravelRequest'))
const TravelRequestForm = React.lazy(() => import('./components/ui/TravelRequestForm'))
const ExpenseClaim = React.lazy(() => import('./components/ui/ExpenseClaim'))
const ExpenseClaimDetails = React.lazy(() => import('./components/ui/ExpenseClaimDeatils'))
const UserProfile = React.lazy(() => import('./views/profile/UserProfile'))
const AllMaterialRequest = React.lazy(() => import('./components/ui/material/AllMaterialRequest'))
const PendingForApproval = React.lazy(() => import('./components/ui/material/PendingForApproval'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/all-material-requests',
    name: 'Material Request',
    element: MaterialRequest,
    exact: true,
  },
  {
    path: '/all-material-requests/material-request-form',
    name: 'Material Request Form',
    element: MaterialRequestForm,
    exact: true,
  },
  { path: '/leave-request', name: 'Leave Request', element: LeaveRequest, exact: true },
  {
    path: '/leave-request/leave-request-form',
    name: 'Leave Request Form',
    element: LeaveRequestForm,
    exact: true,
  },
  { path: '/service-request', name: 'Service Request', element: ServiceRequest, exact: true },
  {
    path: '/service-request/service-request-form',
    name: 'Service Request Form',
    element: ServiceRequestForm,
  },
  { path: '/payslip-detail', name: 'Payslip', element: PayslipDetails, exact: true },
  { path: '/payslip', name: 'Payslip', element: Payslip },
  { path: '/attendance-details', name: 'Attendance Details', element: Attendance },
  {
    path: '/transportation-request',
    name: 'Transportation Request',
    element: TravelRequest,
    exact: true,
  },
  {
    path: '/transportation-request/transportation-request-form',
    name: 'Transportation Request',
    element: TravelRequestForm,
  },
  { path: '/expense-claim-details/expense-claim', name: 'Expense Claim', element: ExpenseClaim },
  {
    path: '/expense-claim-details',
    name: 'Expense Claim Details',
    element: ExpenseClaimDetails,
    exact: true,
  },
  {
    path: '/profile',
    name: 'User Profile',
    element: UserProfile,
    exact: true,
  },
  // {
  //   path: '/material-request/all-material-requests',
  //   name: 'All Material Requests',
  //   element: MaterialRequest,
  // },
  {
    path: '/pending-for-approval',
    name: 'Pending for Approval',
    element: PendingForApproval,
  },
]

export default routes
