import React, { useCallback, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Button from '../../components/Button'
import { useStoreContext } from '../../context/StoreContext'
import axios from 'axios'
import H1 from '../../components/H1'
import toast from 'react-hot-toast'

const PLACE_ORDER_URL = import.meta.env.VITE_PLACE_ORDER_URL

function Cart() {
    const { itemsInCart, getAndSetCartItemList, cartTotalAmount } =
        useStoreContext()

    const itemsPreparedForCart = itemsInCart.reduce((acc, curr) => {
        const { id: itemId, quantity } = curr
        acc[itemId] = quantity
        return acc
    }, {})

    const handleCheckout = useCallback(async () => {
        try {
            if (!itemsInCart.length) {
                toast.error('Your cart is empty!')
                return
            }

            const response = await axios.post(
                PLACE_ORDER_URL,
                {
                    items: itemsPreparedForCart,
                    amount: cartTotalAmount,
                    address: 'Default Address', // You can customize later
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.data.success) {
                toast.error(response.data.msg || 'Checkout failed.')
                return
            }

            const payload = response.data.data
            const paymentObject = new window.Razorpay(payload)
            paymentObject.open()
        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.msg ||
                    'Something went wrong during checkout.'
            )
        }
    }, [itemsInCart, cartTotalAmount])

    useEffect(() => {
        getAndSetCartItemList()
    }, [])

    return (
        <>
            <Navbar />
            <section className="w-full bg-[#FFF8F1] py-6">
                <div className="mx-auto w-full max-w-5xl space-y-6 rounded-xl bg-white px-6 py-10 shadow-md sm:px-8">
                    <H1 className="text-center text-3xl font-bold text-gray-900">
                        Your Cart
                    </H1>

                    <div className="max-h-[60vh] space-y-4 overflow-y-auto px-1">
                        {itemsInCart.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Your cart is empty.
                            </p>
                        ) : (
                            itemsInCart.map((item, index) => (
                                <CartItemCard item={item} key={index} />
                            ))
                        )}
                    </div>

                    <div className="border-t border-gray-200 pt-6 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>₹{cartTotalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">GST (18%)</span>
                            <span>₹{(cartTotalAmount * 0.18).toFixed(2)}</span>
                        </div>
                        <div className="mt-2 flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>
                                ₹
                                {(
                                    cartTotalAmount +
                                    cartTotalAmount * 0.18
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                onClickHandler={handleCheckout}
                                className="rounded-lg bg-green-600 px-6 py-2 font-bold text-white hover:bg-green-700 active:scale-95"
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

function CartItemCard({ item }) {
    const { id, name, image, category, price, quantity } = item
    const { addItemToCart, removeItemFromCart } = useStoreContext()

    return (
        <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 shadow-sm">
            {/* Left: Image and Info */}
            <div className="flex items-center gap-4">
                <img
                    src={`http://localhost:3000/images/${image}`}
                    alt={name}
                    className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-800">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500">
                        Category: {category}
                    </p>
                </div>
            </div>

            {/* Right: Quantity Controls & Price */}
            <div className="flex items-center gap-4">
                {/* Increment-Decrement Controller (Styled Like Menu Cards) */}
                <div className="flex items-center gap-3 rounded-full border bg-white px-3 py-1 shadow-md">
                    <button
                        onClick={() => removeItemFromCart(id)}
                        className="text-red-600 transition hover:scale-110"
                    >
                        ➖
                    </button>
                    <span className="min-w-[24px] text-center text-sm font-medium text-gray-800">
                        {quantity}
                    </span>
                    <button
                        onClick={() => addItemToCart(id)}
                        className="text-green-600 transition hover:scale-110"
                    >
                        ➕
                    </button>
                </div>

                {/* Price */}
                <p className="min-w-[60px] text-right text-sm font-semibold text-green-700">
                    ₹{quantity * price}
                </p>
            </div>
        </div>
    )
}

export default Cart
