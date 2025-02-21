import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Container, Rating, IconButton, TextField, Box, ButtonGroup, Button, Input } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CardContainer from "../productCard/CardContainer";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";

function ProductPage() {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const { addToCart,  } = useContext(Context);
  const [quantity, setQuantity] = useState(1);

  const [wishlistAdded, setWishlistAdded] = useState(false)


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, []);
  useEffect(() => {

  }, [quantity]);

  return (
    <>
      <Navbar />
      {loading ? (
        <CircularProgress />
      ) : product ? (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', mt:8, ml:10,width:'100%' }}>
          <Typography variant="body1" onClick={()=> Navigate('/')} sx={{cursor:'pointer'}}>HOME /</Typography>
          <Typography variant="body1" onClick={()=> Navigate(`/product-list/${product.category}`)} sx={{cursor:'pointer',textTransform: 'uppercase',}}> {product.category} / </Typography>
          <Typography variant="body1"sx={{cursor:'pointer',textTransform: 'uppercase',}}> {product.brand} </Typography>
        </Box>

          <Card sx={{ display: "flex", margin: "20px", padding: "20px", width: "100%", justifyContent: "center", boxShadow: 'none' }}>
            <CardMedia
              component="img"
              sx={{ width: '30%', objectFit: "contain", backgroundColor: "lightgray", padding: "20px" }}
              image={product.image}
              alt={product.title}
            />
            <CardContent sx={{ width: '30%', padding: "20px" }}>
              <Typography variant="h5">{product.title}</Typography>
              <Rating name="read-only" value={4} readOnly />
              <Typography variant="h6">${product.price}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ marginRight: '20px', }} >
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
                <Button variant="text" sx={{
                  p: 1, backgroundColor: '#DB4444', color: 'white', '&:hover': {
                    backgroundColor: "rgb(214, 89, 89)"
                  }, px: 3, marginRight: '20px',
                }} onClick={() => {
                  addToCart(product.id, quantity);
                }}>Add to Cart</Button>
                <Box sx={{ border: '1px solid lightgray', borderRadius: '5px' }}>

                  <IconButton color="outline" onClick={() => {
                        setWishlistAdded(!wishlistAdded)
                      }} >
                    {
                      wishlistAdded ? <Favorite 
                        sx={{ color: '#DB4444' }}
                      /> : <FavoriteBorder 
                      />
                    }
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <Typography variant="body1" sx={{ width: '150px' }}>Check Delivery</Typography>
                <Input placeholder="Your pincode" />
                <Button variant="text" sx={{
                  p: 1, backgroundColor: '#DB4444', color: 'white', '&:hover': {
                    backgroundColor: "rgb(214, 89, 89)"
                  }, px: 4, marginLeft: '20px',
                }}>Check</Button>
              </Box>
            </CardContent>
          </Card>
          <CardContainer category={product.category} title='Related Items' cardLimit='5' />
        </>
      ) : (
        <Typography variant="h6">Product not found!</Typography>
      )}
    </>
  );
}

export default ProductPage;
