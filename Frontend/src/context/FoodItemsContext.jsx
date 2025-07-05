import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const FoodListContext = createContext()

export const useFoodList = () => {
    return useContext(FoodListContext)
}

export const FoodListProvider = ({ children }) => {
    const [foodList, setFoodList] = useState([])

    //This function loads foodlist data from backend.
    const getFoodList = async () => {
        const response = await axios.get(
            'http://localhost:3000/food/listfooditems'
        )
        if (!response.data.success) {
            toast.error('Some Error occured')
            return
        }
        setFoodList(response.data.data)
    }

    useEffect(() => {
        getFoodList()
    }, [])

    const contextValue = { foodList, setFoodList, getFoodList }

    return (
        <FoodListContext.Provider value={contextValue}>
            {children}
        </FoodListContext.Provider>
    )
}
