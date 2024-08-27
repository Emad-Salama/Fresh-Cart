import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Checkout.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Alert } from "flowbite-react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'

export default function Checkout() {

  const { getPayment, cartId } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(false);



  const initialValues = {
    details: "details",
    phone: "01010800921",
    city: "Cairo"
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleCheckout,

  });



  async function handleCheckout(values) {
    console.log("Submit", values);
    // const url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    const url = isOnline
        ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
        : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    const res = await getPayment(url, values);
    if (res.status == 'success') {
      // console.log("data", res.session.url);
      if (isOnline) {
        window.location.href = res.session.url;
      } else {
        toast.success("payment done successfully");

        setTimeout(() => {
          navigate("/allorders")
        },5000)
      }

    } else {

    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className='text-4xl font-bold mb-8'>Checkout:</h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />

          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your details
          </label>

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

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />

          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your city
          </label>
         
        </div>

        <input 
        type="checkbox" 
        name=""
        id="isOnline" 
        onChange={() => setIsOnline(!isOnline)}
        />
        <label htmlFor="isOnline">is pay online</label>

        <button
          type="submit"
          className= "btn btn-green w-full ">
          { isOnline ? "Pay Online" : "Pay Cash"}
        </button>
      </form>

    </>
  )
}
