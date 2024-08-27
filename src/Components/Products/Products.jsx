import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Products.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import Product from '../Product/Product'
import Loader from '../Loader/Loader'
import {Helmet} from "react-helmet";

export default function Products() {
  
  const { data, isLoading, isError, error } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/products`,
    "Products"
  );
  console.log("Products", data);

  return (
    <>
         <section className='py-20'>
        <div className="container mx-auto">
          <h1>Products</h1>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Products Page</title>
            </Helmet>
          {
            isLoading ? (
            <Loader />
            ) : isError ? (
            <div className='alert alert-error'>{error}</div>
            ) : (
          <div className="row">
            {
              data?.data.data.map((product)=>(
                <Product key={product.id} product={product}/>
              ))}
          </div> 
        )}
        </div>
      </section>
    </>
  )
}
