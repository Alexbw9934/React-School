import React, { useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectRoute = () => {
  const auth = localStorage.getItem('access_token')
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectRoute
