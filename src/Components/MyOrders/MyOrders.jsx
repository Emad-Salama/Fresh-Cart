import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./MyOrders.module.css"
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'

export default function MyOrders() {
    
  const { userId } = useContext(CartContext);

  async function getMyOrders() {
    
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

useEffect(() => {
  userId && getMyOrders();
}, [userId])


  return (
    <>
        <section className='py-20'>
          <div className="container mx-auto">
            <h1 className='text-3xl'>MyOrders</h1>
          </div>
        </section>
    </>
  )
}
