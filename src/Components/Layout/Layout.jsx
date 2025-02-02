import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Layout.module.css"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Outlet } from 'react-router-dom'

export default function Layout() {
    
  return (
    <>
        <Navbar />
        
        <Outlet />
      
        <Footer />
    </>
  )
}
