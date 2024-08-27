import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from "./Home.module.css"
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import {Helmet} from "react-helmet";

export default function Home() {
    
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                
            </Helmet>
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
    </>
  )
}
