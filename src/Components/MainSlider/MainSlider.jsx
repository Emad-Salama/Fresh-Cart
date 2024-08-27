import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./MainSlider.module.css"
import img1 from "../../assets/images/grocery-banner-2.jpeg"
import img2 from "../../assets/images/grocery-banner.png"

import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"

import Slider from "react-slick";


export default function MainSlider() {
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const images = [
    {
      src: slide1,
      label: 'image 1'
    },
    {
      src: slide2,
      label: 'image 2'
    },
    {
      src: slide3,
      label: 'image 3'
    },
  ]

  return (
    <>
        <section className='py-20'>
        <div className="container mx-auto">
            <h1 className='text-3xl mb-2 font-bold'>Main Slider</h1>
            <div className="row">
              <div className="w-2/3">
              <Slider {...settings}>
                {images.map((image, index)=>(
                  <img 
                  key={index}
                  className='h-[400px]' 
                  src={image.src} 
                  alt={image.label} 
                  />
                ))}
                {/* <img className='h-[400px]' src={slide1} alt="" />
                <img className='h-[400px]' src={slide2} alt="" />
                <img className='h-[400px]' src={slide3} alt="" /> */}
              </Slider>
              </div>

              <div className="w-1/3">
                <img className='h-[200px]' src={img1} alt="" />
                <img className='h-[200px]' src={img2} alt="" />
              </div>
            </div>
        </div>
      </section>
    </>
  )
}
