import React, { useState } from 'react'
import UserContext from './Context'

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [idCount, setIdCount] = useState(0)

    const addToCart = (id, quantity) => {
        // setCart([...cart, {id,quantity}])
        if (cart.length === 0) {
            setCart([...cart, { id, quantity }])

        }
        if (cart.length > 0) {
            let found = false
            cart.map(item => {
                if (item.id === id) {
                    found = true
                    item.quantity = item.quantity + quantity
                }
            })
            if (!found) {
                setCart([...cart, { id, quantity }])
            }
        }
    }
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id))
    }
    return (
        <UserContext.Provider value={{ cart, addToCart, idCount, setIdCount, removeFromCart }}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextProvider