import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Brands.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'
import Loader from '../Loader/Loader'
import Product from '../Product/Product'
import {Helmet} from "react-helmet";

export default function Brands() {

  const { data, isLoading, isError, error } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/brands`,
    "Brands"
  );
  console.log("Brands", data);

  return (
    <>
        <section className='py-20 '>
          <div className="container mx-auto">
            <h1 className='text-green-500 mb-4 text-center'>All Brands</h1>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands Page</title>
            </Helmet>
            {
            isLoading ? (
            <Loader />
            ) : isError ? (
            <div className='alert alert-error'>{error}</div>
            ) : (
          <div className="row ">
            {
              data?.data.data.map((brand)=>(
                <div  className='w-1/4 px-8 mb-4 border-black  shadow hover:shadow-green-500 text-center py-8'>
                  <img className='w-3/4' src={brand.image} alt={brand.name} />
                  <h3 className='text-center fw-bold my-4'>{brand.name}</h3>
                </div>
              ))}
          </div> 
        )}
            
          </div>
        </section>
        
    </>
  )
}
