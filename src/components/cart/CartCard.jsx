import { Box, Button, ButtonGroup, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react';

const CartCard = ({ image, title,price, quantity, productId, onQuantityChange, onDeleteBtnClick }) => {
  const priceSection = (
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}> $ {price * quantity} </Typography>
  );

  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, Number(event.target.value));
    onQuantityChange(productId, newQuantity);
  };
  const handleDecrease = (event) => {
    const newQuantity = Math.max(1, quantity - 1);
    onQuantityChange(productId, newQuantity);
  }
  const handleIncrease = (event) => {
    const newQuantity = Math.max(1, quantity + 1);
    onQuantityChange(productId, newQuantity);
  }

  const handleDelete = () => {
    onDeleteBtnClick(productId)
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      {isSmallScreen &&
        <>
          <Box sx={{ display: 'flex',flexDirection:'column',p:1 ,backgroundColor: '#fff',height:'100%' }}>
            <img src={image} alt="product" width="150px" />
            
            <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ marginTop: '50px', }} >
                  <Button onClick={handleDecrease} size="large"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#DB4444',
                        color: 'white'
                      },
                    }}
                  >-</Button>
                  <Button sx={{ color: 'black' }} size="large">{quantity}</Button>
                  <Button onClick={handleIncrease}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#DB4444',
                        color: 'white'
                      },
                    }}
                    size="large">+</Button>
                </ButtonGroup>

          </Box>

          <Box sx={{ display: 'flex',flexDirection:'column', justifyContent: 'space-between', p:1 }}>
            <Typography variant="body2" > {title} </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}> $ {price} </Typography>

            <IconButton onClick={handleDelete} >
              <DeleteIcon />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}> Delete Item </Typography>
            </IconButton >
          </Box>
        </>
      }

      {isLargeScreen &&
        <>
          <img src={image} alt="product" width="120px" />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}> $ {price} </Typography>

          <TextField
            id="outlined-number"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            sx={{ width: '70px' }}
          />
          {priceSection}
          <IconButton onClick={handleDelete} >
            <DeleteIcon />
          </IconButton >
        </>}

    </>
  );
};

export default CartCard;
