import {Outlet} from 'react-router-dom'
import NavbarDemo from './components/NavbarDemo'
import React from 'react'

function RootLayout() {
  return (
    <div>
        <NavbarDemo/>
        <div >
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout