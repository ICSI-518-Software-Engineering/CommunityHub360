import React from 'react'
import TenantNavbar from './TenantNavbar'
import ViewAnnouncements from './ViewAnnouncements'
import MyInfo from './MyInfo'

export default function TenantDash() {
  return (
    <div>
      <TenantNavbar/>
      <MyInfo/>
      <ViewAnnouncements/>
    </div>
  )
}
