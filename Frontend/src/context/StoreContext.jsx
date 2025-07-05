import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const ADD_ITEM_TO_CART_URL = import.meta.env.VITE_ADD_ITEM_TO_CART_URL
const REMOVE_ITEM_FROM_CART_URL = import.meta.env.VITE_REMOVE_ITEM_FROM_CART_URL
const GET_CART_ITEMS_URL = import.meta.env.VITE_GET_CART_ITEMS_URL

const StoreContext = createContext(null)

function StoreContextProvider({ children }) {
    const { user } = useAuth()
    const [itemsInCart, setItemsInCart] = useState([])
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [itemsQuantityInCart, setItemsQuantityInCart] = useState(0)

    // Fetch cart items when user logs in
    useEffect(() => {
        if (user) getAndSetCartItemList()
        else {
            setItemsInCart([])
            setCartTotalAmount(0)
            setItemsQuantityInCart(0)
        }
    }, [user])

    // Get cart data from backend
    async function getAndSetCartItemList() {
        try {
            const res = await axios.post(
                GET_CART_ITEMS_URL,
                {},
                { withCredentials: true }
            )

            const { success, data } = res.data
            if (!success) {
                toast.error('Failed to fetch cart items')
                return
            }

            setItemsInCart(data.cartItemsArray || [])
            setCartTotalAmount(data.cartTotalAmount || 0)
            setItemsQuantityInCart(data.numberOfItemsInCart || 0)
        } catch (err) {
            toast.error(err.message || 'Network error')
        }
    }

    // Add item to cart
    async function addItemToCart(itemId) {
        if (!user) {
            toast.error('Please login to add items to cart')
            return
        }

        try {
            const res = await axios.post(
                ADD_ITEM_TO_CART_URL,
                { itemId },
                { withCredentials: true }
            )

            if (!res.data.success) {
                toast.error(res.data.msg)
                return
            }

            await getAndSetCartItemList()
        } catch (err) {
            toast.error(err.message || 'Failed to add item')
        }
    }

    // Remove item from cart
    async function removeItemFromCart(itemId) {
        if (!user) {
            toast.error('Please login to remove items from cart')
            return
        }

        try {
            const res = await axios.post(
                REMOVE_ITEM_FROM_CART_URL,
                { itemId },
                { withCredentials: true }
            )

            if (!res.data.success) {
                toast.error(res.data.msg)
                return
            }

            await getAndSetCartItemList()
        } catch (err) {
            toast.error(err.message || 'Failed to remove item')
        }
    }

    // Add this inside StoreContextProvider

    async function updateItemQuantity(itemId, type) {
        if (!user) {
            toast.error('Please login first!')
            return
        }

        const url =
            type === 'increment'
                ? ADD_ITEM_TO_CART_URL
                : REMOVE_ITEM_FROM_CART_URL

        try {
            const res = await axios.post(
                `${url}`,
                { itemId },
                { withCredentials: true }
            )

            if (!res.data.success) {
                toast.error(res.data.msg)
                return
            }

            await getAndSetCartItemList()
        } catch (err) {
            toast.error(err.message || 'Failed to update quantity')
        }
    }

    const contextValue = {
        itemsInCart,
        addItemToCart,
        removeItemFromCart,
        getAndSetCartItemList,
        cartTotalAmount,
        itemsQuantityInCart,
        updateItemQuantity,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export function useStoreContext() {
    return useContext(StoreContext)
}

export default StoreContextProvider
