import React from 'react'
import MaintenanceNav from './MaintenanceNav'
import MaintenanceRequestList from './MaintenanceRequestList'

export default function MaintenanceDash() {
  return (
    <div>
      <MaintenanceNav/>
      <MaintenanceRequestList/>
    </div>
  )
}
