import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    if (!localStorage.getItem('userToken')) {
        // return <h1 className='text-9xl'>Outttttttttt !</h1>
        return <Navigate to={"/login"} />
    }
  return children
}
