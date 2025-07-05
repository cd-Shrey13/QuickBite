import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const FoodListContext = createContext()
const GET_MENU_ITEMS_URL = import.meta.env.VITE_GET_MENU_ITEMS_URL

export const useFoodList = () => {
    return useContext(FoodListContext)
}

export const FoodListProvider = ({ children }) => {
    const [foodList, setFoodList] = useState([])
    const [loading, setLoading] = useState(true);

useEffect(() => {
    axios.get('/your-food-api')
})


    //This function loads foodlist data from backend.
    const getFoodList = async () => {
        axios.get(GET_MENU_ITEMS_URL).then((res) => {
        setFoodList(res.data.data)
    }).catch((err) => {
        toast.error(err)
    }).finally(() => {
        setLoading(false)
    })
    }

    useEffect(() => {
        getFoodList()
    }, [])

    const contextValue = { foodList, setFoodList, getFoodList, loading, setLoading }

    return (
        <FoodListContext.Provider value={contextValue}>
            {children}
        </FoodListContext.Provider>
    )
}
