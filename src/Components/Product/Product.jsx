import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Product.module.css"
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'

export default function Product({ product }) {

  const { addToCart } = useContext(CartContext)

  async function addProductToCart(productId) {
    const res = await addToCart(productId)
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message, {
        theme: 'light',
      });
    } else {
      toast.error("something went wrong", {
        theme: 'light',
      })
    }
  }


  return (
    <>
      <div className='w-1/6 px-4 mb-4 product'>
        <Link to={`/product-details/${product.id}/${product.category.name}`}>
          <img className='mb-2' src={product.imageCover} alt={product.title} />
          <span className='mb-2 text-green-500'>{product.category.name}</span>
          <h2 className='text-lg font-semibold truncate mb-2'>{product.title}</h2>
          <div className='flex justify-between text-gray-500 font-light'>
            <span>{product.price} EGP</span>
            <div>
              <span>{product.ratingsAverage}</span>
              <i className='fas fa-star text-yellow-300 mr-3'></i>
              <i role='button' onClick={()=> addToWish(product.id)} className='fas fa-heart ml-3 block'></i>
            </div>
          </div>
        </Link>

        <button onClick={()=> addProductToCart(product.id)} className='btn btn-green w-full mb-1'>Add To Cart</button>
      </div>
    </>
  )
}
