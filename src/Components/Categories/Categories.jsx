import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import classes from "./Categories.module.css";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader'
import {Helmet} from "react-helmet";




export default function Categories() {
  
  const { data, isLoading, isError, error, } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "Categories"
  );
  console.log("Categories", data);

  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <h1 className='text-3xl mb-2 font-bold'>Categories</h1>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Categories Page</title>
            </Helmet>
          {
            isLoading ? (
            <Loader />
            ) : isError ? (
            <div className='alert alert-error'>{error}</div>
            ) : (
          <div className="row">
                {data?.data.data.map((category) => (
                  
                  <div key={category.id} className='w-1/3 px-4 mb-4  border-black  shadow hover:shadow-green-500  text-center p-4'>
                    <img 
                    className='h-[300px] w-full'
                    src={category.image} 
                    alt={category.name} 
                    />
                    <h2 className='text-green-500 text-3xl'>{category.name}</h2>
                  </div>
              ))}
          </div> 
        )}
        </div>
      </section>
    </>
  )
}
