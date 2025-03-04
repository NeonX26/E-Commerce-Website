import React, { useContext, useEffect, useState } from 'react'
import CardContainer from '../productCard/CardContainer'
import Navbar from '../navbar/Navbar'
import { Box, Grid2, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Context from '../../context/Context'
import ProductCard from '../productCard/ProductCard'

const Wishlist = () => {
  const { wishlistData } = useContext(Context)
  const [wishlistItems, setWishlistItems] = useState([])
  const Navigate = useNavigate()
  console.log(wishlistData)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productPromises = wishlistData.map(async (id) => {
          const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
          const data = await response.json();
          // console.log(data)
          return { data: data.product, };
        });

        const products = await Promise.all(productPromises);

        setWishlistItems(products);

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);
  // console.log(wishlistItems)
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 4, md: 8 }, pl: { xs: 2, md: 10 }, width: '100%' }}>
        <Typography variant="body1" onClick={() => Navigate('/')} sx={{ cursor: 'pointer', fontSize: { xs: 12, md: 15 } }}>HOME /</Typography>
        <Typography variant="body1" sx={{ cursor: 'pointer', textTransform: 'uppercase', fontSize: { xs: 12, md: 15 } }}> Audio </Typography>
      </Box>
          <Grid2 container justifyContent="center" flexDirection={'column'} sx={{ mx: { md: 5 }, mb: 2, backgroundColor: '#f5f5f5', my: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

              <Typography variant="h4" sx={{ pl: 4, py: 2, fontSize: { xs: '25px' } }} >
                Wishlist
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', pb: 2 }} gutterBottom>
              {wishlistItems.map((product) => (
                <Grid2 item key={product.data.id} sx={{ m: 1 }}>
                  <ProductCard
                    image={product.data.image}
                    title={product.data.title}
                    price={product.data.price}
                    id={product.data.id}
                  />
                </Grid2>
              ))}
            </Box>
          </Grid2>
    </>
  )
}

export default Wishlist