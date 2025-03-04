import React, { useEffect, useState } from 'react'
import UserContext from './Context'

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [idCount, setIdCount] = useState(0)
    const [user, setUser] = useState(null)
    const [wishlistData, setWishlistData] = useState([])
    const [wishCount, setWishCount] = useState(0)
    const [loggedIn, setLoggedIn] = useState(false)

    
    useEffect(() => {
        if (!loggedIn) {
            setUser(null)
            setCart([])
            setIdCount(0)
            setWishlistData([])
            setWishCount(0)
        }
    }, [loggedIn])

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

    const loadWishlist = async () => {
        console.log('Data loaded.....')
        try {
            const response = await fetch(`http://192.168.29.144:6300/load-wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.userInfo.email
                })

            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            setWishlistData(data.wishlist)
            setWishCount(data.wishlist.length)
            if (!loggedIn) {
                setUser(null)
                setCart([])
                setIdCount(0)
                setWishlistData([])
                setWishCount(0)
            }

        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    }

    return (
        <UserContext.Provider value={{ cart, addToCart, idCount, setIdCount, removeFromCart, user, setUser, loggedIn, setLoggedIn, wishCount, setWishCount, setWishlistData, wishlistData, loadWishlist }}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextProvider