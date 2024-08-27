import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Alert } from "flowbite-react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function Register() {

  // const [apiError, setApiError] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUserToken } = useContext(AuthContext)



  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'minum length 3 chars')
      .max(10, 'maximum length 10 chars')
      .required('Name is required'),
    email: Yup.string()
      .email()
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9_]{4,8}$/, 'Password should be between 5 & 9 chars')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'rePassword & password not the same')
      .required('rePassword is required'),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/,'Invalid Phone Number')
      .required('Phone is required'),

  })

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    // validate: validateForm,
    onSubmit: handleRegister,

  });

  // function validateForm(values) {
  //   // console.log("Validate", values);
  //   let errors = {};
  //   // Name
  //   if (!values.name){
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3){
  //     errors.name = "Length of Name must be at least 3 chars";
  //   } else if (values.name.length > 10){
  //     errors.name = "Length of Name must be at most 10 chars";
  //   }

  //   // Email
  //   if (!values.email){
  //     errors.email = "Email is required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email = "Invalid email address";
  //   } 

  //   // Password
  //   if (!values.password){
  //     errors.password = "password is required";
  //   } else if (values.password.length < 6){
  //     errors.password = "Length of password must be at least 6 chars";
  //   } else if (values.password.length > 15){
  //     errors.password = "Length of password must be at most 15 chars";
  //   } else if (!/^[A-Z][a-z0-9@#$%&*_]{5,10}$/i.test(values.password)){
  //     errors.password = "Password must be srarts with capital letter";
  //   }

  //   //rePassword
  //   if (!values.rePassword){
  //     errors.rePassword = "rePassword is required";
  //   } else if (values.rePassword != values.password){
  //     errors.rePassword = "rePassword must be matched password";
  //   }


  //   // Phone 
  //   if (!values.phone){
  //     errors.phone = "Phone is required";
  //   } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)){
  //     errors.phone = "Invalid Phone Number";
  //   } 

  //   return errors;

  // }


  async function handleRegister(values) {
    // console.log("Submit", values);
    setIsLoading(true)
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      console.log(data);
      // setApiError(data.message);
      setError(data.message);

      // success
      if(data.message == 'success'){
        setUserToken(data.token)
        navigate("/login")
      }
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }

    // } catch (error) {
      //   console.log(error);
      //   setApiError(error.response.data.message);
      // }

  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className='text-4xl font-bold mb-8'>Register:</h1>
        <div className=' mb-6'>
      {error && (
        <Alert color="info">
        <span className="font-medium ">{error}</span> 
      </Alert>
      )}
      </div>
      </div>
      

      {/* {apiError ? (<h2 className='bg-orange-500 p-3 text-center max-w-xl mx-auto mb-5'>{apiError}</h2>): null} */}
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />

          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your name
          </label>
          {formik.errors.name && formik.touched.name && (
            <span className='text-red-500'>{formik.errors.name}</span>
          )}
        </div>

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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />

          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your confirmation password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <span className='text-red-500'>{formik.errors.rePassword}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />

          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <span className='text-red-500'>{formik.errors.phone}</span>
          )}
        </div>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          {isLoading ?
            <i className='fas fa-spinner fa-spin'></i>
            : 'Register'
          }
        </button>
      </form>

    </>
  )
}
