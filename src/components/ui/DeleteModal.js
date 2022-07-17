import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'

const DeleteModal = (item) => {
  console.log(item.visible)
  return (
    <CModal visible={item.visible} onClose={() => item.handleClose}>
      <CModalHeader></CModalHeader>
      <CModalBody>Are you Sure you want to delete?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => item.handleClose()}>
          Close
        </CButton>
        <CButton color="primary" onClick={() => item.handleDelete()}>
          Confirm Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteModal
