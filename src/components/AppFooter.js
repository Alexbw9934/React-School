import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a> */}
        <span className="ms-1">&copy; {new Date().getFullYear()} Prometheus School.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed and Managed by</span>
        <a href="https://www.verts.co.in/" target="_blank" rel="noopener noreferrer">
          VERTS
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
