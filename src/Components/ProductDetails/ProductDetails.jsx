import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import classes from "./ProductDetails.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import {Helmet} from "react-helmet";

export default function ProductDetails() {

  // const [productDetails, setProductDetails] = useState({})
  // const [error, setError] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()

  const { addToCart } =  useContext(CartContext)

  const { data, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: () => getProductDetails(),
  });

  async function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  // async function getProductDetails(id) {

  //   setIsLoading(true)
  //   try {
  //     const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  //     console.log(data.data);
  //     setProductDetails(data.data)
  //     setError(null)
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.response.data.message)
  //     setProductDetails([])

  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getProductDetails(id)

  // }, [id])


  async function addProductToCart(productId) {
    const res = await addToCart(productId)
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message, {
        theme: 'light'
      });
    } else {
      toast.error("something went wrong", {
        theme: 'light',
      });
    }
  }


  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <h1 className='text-3xl mb-2 font-bold'>Product Details</h1>
          {
            isLoading ? (
              <Loader />
            ) : error ? (
              <div className='alert alert-error'>{error}</div>
            ) : (
              data && (
                <div className="row items-center">
                <div className="w-1/3 px-4">
                  {/* <img src={productDetails.imageCover} alt={productDetails.title} /> */}
                  <Slider {...settings}>
                    {
                      data.data.data?.images?.map((image, index)=> (
                        <img 
                            key={index}
                            src={image}
                            alt={data.data.data.title} />
                      ))}
                    
                  </Slider>
                </div>

                <div className="w-2/3 px-4">
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>{data.data.data.title}</title>
                  <meta name="keywords" content={data.data.data.slug} />
                </Helmet>
                  <h1 className='text-2xl truncate mb-2'>{data.data.data.title}</h1>
                  <p className='mb-2 text-gray-500 font-light'>{data.data.data.description}</p>
                  <div className='flex justify-between text-gray-500 font-light mb-2'>
                    <div>
                      <p>{data.data.data.category?.name}</p>
                      <span>{data.data.data.price} EGP</span>
                    </div>
                    <div>
                      <span className='me-1'>{data.data.data.ratingsAverage}</span>
                      <i className='fas fa-star text-yellow-300'></i>
                      <i onClick={()=> addToWish(product.id)}  className='fas fa-heart block'></i>
                    </div>
                  </div>
                  <button onClick={()=> addProductToCart(data.data.data.id)} className='btn btn-green w-full'>Add To Product</button>
                </div>
              </div>
            )
            )}
        </div>
      </section>

      <RelatedProducts />
    </>
  )
}
