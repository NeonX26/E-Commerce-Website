import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const Navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 8, ml: 10, width: '100%' }}>
        <Typography variant="body1" onClick={() => Navigate('/')} sx={{ cursor: 'pointer',color:'GrayText' }}>HOME /</Typography>
        <Typography variant="body1"  sx={{ cursor: 'pointer',ml:1 }}>404 PAGE </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '70vh' ,mb: 2 }}>
        <Typography variant="h1">404 Not Found</Typography>
        <Typography variant="h5">The page you are looking for does not exist</Typography>
        <Button onClick={() => Navigate('/')} variant="contained" sx={{ mt: 4, backgroundColor:'#DB4444' , py:1, px:3}}>Back to Home Page</Button>
      </Box>
    </>
  )
}

export default PageNotFound