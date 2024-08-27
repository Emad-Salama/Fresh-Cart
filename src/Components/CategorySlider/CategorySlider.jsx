import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./CategorySlider.module.css"
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySlider() {


  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  async function getCategories() {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data)
      console.log("categories", data.data);
      setError(null)
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
      setCategories([])

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <h1 className='text-3xl mb-2 font-bold'>Category Slider</h1>
          
            <Slider {...settings}>

              {categories.map((category) => (
                <div key={category.id}>
                  <img 
                  className={`mb-2 ${classes.CategoryImage}`} 
                  src={category.image} 
                  alt={category.name} 
                  />
                  <h2>{category.name}</h2>
                </div>
              ))}
            </Slider>
            
        </div>
      </section>
    </>
  )
}
