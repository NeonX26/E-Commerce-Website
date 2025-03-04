import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/Navbar'
import CartContainer from './CartContainer'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const Navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 4, md: 8 }, pl: { xs: 2, md: 10 },width:'100%' }}>
          <Typography variant="body1" onClick={()=> Navigate('/')} sx={{cursor:'pointer',fontSize:{xs:12,md:15}}}>HOME /</Typography>
          <Typography variant="body1" sx={{cursor:'pointer',fontSize:{xs:12,md:15}}}> CART </Typography>
        </Box>
        <CartContainer />
    </>
  )
}

export default Cart