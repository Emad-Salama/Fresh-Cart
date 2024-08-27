import React from 'react'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";


export default function WishList() {
  const { getWish,  wishListDetails, setWishListDetails, deleteWish, cartId } = useContext(CartContext);
  const { userToken } = useContext(AuthContext);

  
  async function getWishListDetails() {
    const res = await getWish();
    if (res.status == 'success') {
      setWishListDetails(res.data)
    } else {
      console.log(res);
    }

  }


  async function deleteProductFromWishList(productId) {
    const res = await deleteWish(productId);
    if (res.status == 'success') {
      toast.success("product removed successfully")
    } else {
      toast.error("something went wrong")
    }
  }


  useEffect(() => {
    userToken && getWishListDetails();
  }, [userToken]);

  return (
    <>
    <section className='py-20'>
      <div className="container mx-auto">
        <h1>WishList</h1>
        <Helmet>
                <meta charSet="utf-8" />
                <title>WishList Page</title>
            </Helmet>
            { wishListDetails && (
            <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  { cartDetails?.products?.map((product)=>(
                      <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button 
                        onClick={() => deleteProductFromWishList(product.product.id)} 
                        className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Remove
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
        
            </>
          )}
      </div>
    </section>
    </>
  )
}
