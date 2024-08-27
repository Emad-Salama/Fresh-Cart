import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./RecentProducts.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'
import Product from '../Product/Product'
import { useQuery } from '@tanstack/react-query'

export default function RecentProducts() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["RecentProducts"],
    queryFn: () => getRecentProducts(),

  });

  console.log("RecentProducts", data);
  
  async function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  // const [products, setProducts] = useState([])
  // const [error, setError] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  // async function getRecentProducts() {
    
  //   setIsLoading(true)
  //   try {
  //     const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //     console.log(data.data);
  //     setProducts(data.data)
  //     setError(null)
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.response.data.message)
  //     setProducts([])
      
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getRecentProducts()
  // }, [])
  

    
  return (
    <>
        <section className='py-20'>
        <div className="container mx-auto">
          <h1>RecentProducts</h1>
          {/* <button onClick={refetch} className='btn btn-green w-full'>View All</button> */}
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
