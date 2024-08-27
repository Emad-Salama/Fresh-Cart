import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const { userToken } = useContext(AuthContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartDetails, setCartDetails] = useState(null);
    const [wishListDetails, setwishListDetails] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [userId, setUserId] = useState(null);

    const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;
    const headers = {
        token: userToken,
    };

    useEffect(() => {
        userToken && getCart();
    }, [userToken]);

    async function getCart() {
        try {
            const { data } = await axios.get(endPoint, { headers });
            console.log('cart', data);
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            setUserId(data.data.cartOwner);
            return data;
        } catch (error) {
            return error;

        }
    }

    async function addToCart(productId) {
        try {
            const { data } = await axios.post(endPoint, { productId }, { headers });
            console.log(data);
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            setUserId(data.data.cartOwner);
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message
        }
    }


    async function removeFromCart(productId) {
        try {
            const { data } = await axios.delete(`${endPoint}/${ productId }`, { headers });
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
            
        }
    }



    async function updateQuantity(productId, count) {
        try {
            const { data } = await axios.put(`${endPoint}/${ productId }`,{ count }, { headers });
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
            
        }
    }


    async function clearCart() {
        try {
            const { data } = await axios.delete(endPoint, { headers });
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data);
            setCartId(data.cartId);
            
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
            
        }
    }



    async function getPayment(url, shippingAddress) {
        try {
            const { data } = await axios.post(url,{ shippingAddress }, { headers });
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
        }
    }


    async function addToWish(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, {
            headers: {
                token
            }
        })
    }
    
    
    async function deleteWish(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token
            }
        })
    }
    
    
    async function getWish() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token
            }
        })
    }


    return (
        <CartContext.Provider value={{ addToCart, getCart, numOfCartItems, cartDetails, setCartDetails, removeFromCart, updateQuantity, getPayment, cartId, userId, clearCart, addToWish, getWish,  deleteWish}}>
            {children}
        </CartContext.Provider>
    );

}