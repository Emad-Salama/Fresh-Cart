import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Navbar.module.css"
import logo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {

  const { userToken, setUserToken } = useContext(AuthContext)
  const { numOfCartItems } = useContext(CartContext)

  function handleLogout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
  }

  return (
    <>
      <nav className='bg-gray-100 p-4 static lg:fixed top-0 start-0 end-0 z-10'>
        <div className="container mx-auto">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            <div className='flex items-center flex-col lg:flex-row'>
              <Link>
                <img src={logo} alt="Fresh Cart Logo" />
              </Link>
              {userToken && (
                <ul className='flex items-center flex-col lg:flex-row'>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={""}>Home</NavLink>
                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/products"}>Products</NavLink>
                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/categories"}>Categories</NavLink>
                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/brands"}>Brands</NavLink>
                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/cart"}>

                      <button type="button" className="relative inline-flex items-center  text-sm font-medium text-center  rounded-lg  focus:outline-none   ">
                        <i className='fas fa-cart-shopping fa-2x'></i>
                        <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{numOfCartItems}</div>
                      </button>

                    </NavLink>
                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/wishList"}>
                          WishList
                      {/* <button type="button" className="relative inline-flex items-center  text-sm font-medium text-center  rounded-lg  focus:outline-none   ">
                        <i className='fas fa-heart fa-2x'></i>
                        <span className="sr-only">Notifications</span> */}
                        {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{numOfCartItems}</div> */}
                      {/* </button> */}

                    </NavLink>
                  </li>

                </ul>
              )}
            </div>

            <div>
              <ul className='flex flex-col lg:flex-row items-center'>
                {userToken ? (
                  <>
                    <li className='my-2 lg:my-0'>
                      <Link className={"p-2"} onClick={handleLogout}>Logout</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='my-2 lg:my-0'>
                      <NavLink className={"p-2"} to={"/login"}>Login</NavLink>
                    </li>

                    <li className='my-2 lg:my-0'>
                      <NavLink className={"p-2"} to={"/register"}>Register</NavLink>
                    </li>
                  </>
                )}


                <li className='my-2 lg:my-0'>
                  <a href="" className='fab fa-facebook mx-2'></a>
                  <a href="" className='fab fa-twitter mx-2'></a>
                  <a href="" className='fab fa-youtube mx-2'></a>
                  <a href="" className='fab fa-instagram mx-2'></a>
                  <a href="" className='fab fa-tiktok mx-2'></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}
