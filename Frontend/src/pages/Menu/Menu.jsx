import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import H1 from '../../components/H1'
import { FoodListProvider, useFoodList } from '../../context/FoodItemsContext'
import { useStoreContext } from '../../context/StoreContext'
import Loader from '../../components/Loader'
export default function Menu() {
    return (
        <>
            <Navbar />
            <section
                id="menu"
                className="font-Satohi flex w-full items-center justify-center bg-(--color-creme)"
            >
                <div className="flex w-full flex-col items-start justify-between gap-4 rounded-[12px] p-4 md:gap-4">
                    <H1 className={'text-black'}>Best dishes near you</H1>
                    <FoodListProvider>
                        <DishSlider />
                    </FoodListProvider>
                </div>
            </section>
            <Footer />
        </>
    )
}

function DishSlider() {
    const { foodList, loading } = useFoodList()

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {foodList ? (
                    foodList.map((items, index) => (
                        <DishSliderCard item={items} key={index} />
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

function DishSliderCard({ item }) {
    const { image, name, description, price, _id: itemId } = item
    const { itemsInCart, updateItemQuantity } = useStoreContext()

    // Check if item is already in cart
    const cartItem = itemsInCart.find((cartItem) => cartItem.id === itemId)
    const quantity = cartItem ? Number.parseInt(cartItem.quantity) : 0

    return (
        <div className="group relative flex w-full max-w-xs flex-col rounded-2xl bg-white p-3 text-black shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-[#181818] dark:text-white">
            <img
                src={`http://localhost:3000/images/${image}`}
                alt={name}
                className="h-36 w-full rounded-xl object-cover sm:h-44"
            />
            <div className="mt-2 flex flex-col justify-between gap-1">
                <h3 className="truncate text-base font-bold sm:text-lg">
                    {name}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-300">
                    {description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-bold sm:text-lg">
                        ₹ {price}
                    </span>
                    <div className="flex items-center gap-2">
                        {quantity > 0 ? (
                            <>
                                <button
                                    className="h-8 w-8 cursor-pointer rounded-full bg-white text-xl text-black"
                                    onClick={() =>
                                        updateItemQuantity(itemId, 'decrement')
                                    }
                                >
                                    ➖
                                </button>
                                <span className="w-6 text-center">
                                    {quantity}
                                </span>
                                <button
                                    className="h-8 w-8 cursor-pointer rounded-full bg-white text-xl text-black"
                                    onClick={() =>
                                        updateItemQuantity(itemId, 'increment')
                                    }
                                >
                                    ➕
                                </button>
                            </>
                        ) : (
                            <button
                                className="cursor-pointer rounded-[14px] bg-white px-4 py-1 font-semibold text-black hover:bg-gray-100"
                                onClick={() =>
                                    updateItemQuantity(itemId, 'increment')
                                }
                            >
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
