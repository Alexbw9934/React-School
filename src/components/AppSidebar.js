import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import img1 from '../assets/images/PS-logo.png'
import img2 from '../assets/images/logo.png'

// sidebar nav config
import navigation from '../_nav'
import http from '../components/ui/baseUrl'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  console.log(sidebarShow, !unfoldable, 'sidebar')
  const [detail, setDetail] = useState({})
  useEffect(() => {
    http
      .get(`/res.company`)
      .then((response) => {
        console.log(response.data.results[0], 'username')
        setDetail(response.data.results[0])
      })
      .catch((error) => {})
  }, [])
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <img src={`data:image/png;base64,${detail.logo}`} height={40} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
      >
        <div style={{ marginTop: '5px', marginRight: '5px', padding: '5px' }}>
          <img src={img2} height={35} />
        </div>
      </CSidebarToggler>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
