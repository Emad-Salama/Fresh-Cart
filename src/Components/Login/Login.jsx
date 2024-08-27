import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Alert } from "flowbite-react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function Login() {

  // const [apiError, setApiError] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUserToken } = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9_]{4,8}$/)
      .required('Password is required'),
  })

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });


  async function handleLogin(values) {
    setIsLoading(true)
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log(data);

      // success
      if(data.message == 'success'){
        setUserToken(data.token)
        localStorage.setItem('userToken', data.token)
        navigate("/")
      }
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }


  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className='text-4xl font-bold mb-8'>Login:</h1>
        <div className=' mb-6'>
      {error && (
        <Alert color="info">
        <span className="font-medium ">{error}</span> 
      </Alert>
      )}
      </div>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your email
          </label>
          {formik.errors.email && formik.touched.email && (
            <span className='text-red-500'>{formik.errors.email}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your password
          </label>
          {formik.errors.password && formik.touched.password && (
            <span className='text-red-500'>{formik.errors.password}</span>
          )}
        </div>

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          {isLoading ?
            <i className='fas fa-spinner fa-spin'></i>
            : 'Login'
          }
        </button>
      </form>

    </>
  )
}
