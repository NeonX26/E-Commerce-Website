import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { Box, Button, Grid2, Typography } from '@mui/material';
import CartCard from './CartCard';

const CartContainer = () => {
  const { cart, removeFromCart } = useContext(Context);
  const [cartList, setCartList] = useState([]);

  const handleQuantityChange = (productId, newQuantity) => {
    setCartList((prevList) =>
      prevList.map((item) =>
        item.data.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const deleteCard = (productId) => {
    setCartList((prevList) =>
      prevList.filter((item) => item.data.id !== productId)
    );
    removeFromCart(productId)
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productPromises = cart.map(async (item) => {
          const response = await fetch(`https://fakestoreapi.in/api/products/${item.id}`);
          const data = await response.json();
          return { data: data.product, quantity: item.quantity };
        });

        const products = await Promise.all(productPromises);

        setCartList(products);

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

  return (
    <>
      <Grid2 container spacing={5} justifyContent="center" flexDirection={'column'} sx={{ mx: { md: 5 }, mt: 5 }}>
        <Grid2 item size={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 10, backgroundColor: '#f5f5f5', py: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Product</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Price</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Quantity</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Subtotal</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Actions</Typography>
        </Grid2>
        {cartList.map((product, index) => (
          <Grid2 item key={index} size={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 10, backgroundColor: '#f5f5f5' }}>
            <CartCard
              image={product.data.image}
              price={product.data.price}
              quantity={product.quantity}
              productId={product.data.id}
              onQuantityChange={handleQuantityChange}
              onDeleteBtnClick={deleteCard}
            />
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container flexDirection='column' justifyContent="center" sx={{ my: 7, border: '2px solid black', p: 3, width: '25%', mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', ml: 2 }}>Cart Summary</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: 2, borderBottom: '1px solid #4e4241', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', }}>Total Items: </Typography>
          <Typography variant="h6" sx={{ color: '#333', }}>{cartList.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: 2, borderBottom: '1px solid #4e4241', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', }}>Subtotal: </Typography>
          <Typography variant="h6" sx={{ color: '#333', }}>$ {cartList.reduce((acc, item) => acc + item.data.price * item.quantity, 0)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: 2, borderBottom: '1px solid #4e4241', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', }}>Shipping: </Typography>
          <Typography variant="h6" sx={{ color: '#333', }}>Free</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: 2, py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', }}>Total: </Typography>
          <Typography variant="h6" sx={{ color: '#333', }}>$ {cartList.reduce((acc, item) => acc + item.data.price * item.quantity, 0)}</Typography>
        </Box>
        <Button variant="contained" sx={{ width: '100%', mt: 2, backgroundColor: '#DB4444', py: 2 }}>Checkout</Button>

      </Grid2>
    </>
  );
};

export default CartContainer;
