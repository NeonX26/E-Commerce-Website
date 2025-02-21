import { IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react';

const CartCard = ({ image, price, quantity, productId, onQuantityChange,onDeleteBtnClick }) => {
  const priceSection = (
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}> $ {price * quantity} </Typography>
  );

  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, Number(event.target.value)); 
    onQuantityChange(productId, newQuantity);  
  };

  const handleDelete = () => {
    onDeleteBtnClick(productId)
  }

  // useEffect(() => {
  //   console.log(quantity); 
  // }, [quantity]);


  return (
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
    </>
  );
};

export default CartCard;
