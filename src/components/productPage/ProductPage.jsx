import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Container, Rating, IconButton, TextField, Box, ButtonGroup, Button, Input, useTheme, useMediaQuery, Snackbar, Alert } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CardContainer from "../productCard/CardContainer";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import LocationOnIcon from '@mui/icons-material/LocationOn';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const { addToCart, user, loggedIn, wishlistData, setWishlistData, setWishCount, loadWishlist } = useContext(Context);
  const [quantity, setQuantity] = useState(1);


  const [wishlistIcon, setWishlistIcon] = useState(false)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleWish = () => {
    if (wishlistData.includes(id)) {
      setWishlistIcon(true)
    }
    if (!wishlistData.includes(id)) {
      setWishlistIcon(false)
    }
  }

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
        handleWish()

      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    // loadWishlist()

    fetchProductDetail();
  }, [id]);


  const fetchWishlistDetail = async () => {

    try {
      if (!wishlistIcon) {
        const response = await fetch(`http://192.168.29.144:6300/add-wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.userInfo.email,
            productId: id
          })
        })
        const data = await response.json();
        console.log(data)
        setWishlistData(data.wishlist)
        setWishCount(data.wishlist.length)

        // loadWishlist();
      }
      if (wishlistIcon) {
        const response = await fetch(`http://192.168.29.144:6300/remove-wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.userInfo.email,
            productId: id
          })
        })
        const data = await response.json();
        console.log(data)
        setWishlistData(data.wishlist)
        setWishCount(data.wishlist.length)

        // loadWishlist();
      }
      
    }
    catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };



  return (
    <>
      <Navbar />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top', // Can be 'top' or 'bottom'
          horizontal: 'right', // Can be 'left', 'center', or 'right'
        }}
        sx={{ mt: 7 }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Product Added to The Cart
        </Alert>
      </Snackbar>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : product ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 4, md: 8 }, pl: { xs: 2, md: 10 }, width: '80%' }}>
            <Typography variant="body1" onClick={() => Navigate('/')} sx={{ cursor: 'pointer', fontSize: { xs: 12, md: 15 } }}>HOME /</Typography>
            <Typography variant="body1" onClick={() => Navigate(`/product-list/${product.category}`)} sx={{ cursor: 'pointer', textTransform: 'uppercase', fontSize: { xs: 12, md: 15 } }}> {product.category} / </Typography>
            <Typography variant="body1" sx={{ cursor: 'pointer', textTransform: 'uppercase', fontSize: { xs: 12, md: 15 } }}> {product.brand} </Typography>
          </Box>

          {isLargeScreen &&
            <Card sx={{ display: "flex", padding: "20px", width: "100%", justifyContent: "center", boxShadow: 'none' }}>
              <CardMedia
                component="img"
                sx={{ width: '30%', objectFit: "contain", backgroundColor: "#fff", padding: "20px" }}
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
                    handleClick()
                    addToCart(product.id, quantity);
                  }}>Add to Cart</Button>
                  <Box sx={{ border: '1px solid lightgray', borderRadius: '5px' }}>

                    <IconButton color="outline" onClick={() => {
                        fetchWishlistDetail()
                      setWishlistIcon(!wishlistIcon)
                    }} >
                      {
                        wishlistIcon ? <Favorite
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
          }

          {isSmallScreen &&
            <Card sx={{ display: "flex", flexDirection: 'column', padding: "20px", width: "100%", justifyContent: "center", boxShadow: 'none' }}>
              <CardMedia
                component="img"
                sx={{ width: '100%', objectFit: "contain", backgroundColor: "#fff", padding: "20px", }}
                image={product.image}
                alt={product.title}
              />
              <CardContent sx={{ width: '100%', padding: "20px" }}>
                <Typography variant="h5" sx={{ fontSize: 20 }}>{product.title}</Typography>
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

                  <Box sx={{ border: '1px solid lightgray', borderRadius: '5px' }}>

                    <IconButton color="outline" onClick={() => {
                        fetchWishlistDetail()
                      setWishlistIcon(!wishlistIcon)
                    }} >
                      {
                        wishlistIcon ? <Favorite
                          sx={{ color: '#DB4444' }}
                        /> : <FavoriteBorder
                        />
                      }
                    </IconButton>
                  </Box>
                </Box>

                <Button variant="text" sx={{
                  p: 1, backgroundColor: '#DB4444', color: 'white', '&:hover': {
                    backgroundColor: "rgb(214, 89, 89)"
                  }, width: '100%', px: 3, marginRight: '20px', marginTop: '20px',
                }} onClick={() => {
                  handleClick()
                  addToCart(product.id, quantity);
                }}>Add to Cart</Button>

                <Typography variant="body1" sx={{ width: '150px', marginTop: '20px' }}>Check Delivery</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                  <LocationOnIcon />
                  <Input placeholder="Your pincode" />
                  <Button variant="text" sx={{
                    p: 1, backgroundColor: '#DB4444', color: 'white', '&:hover': {
                      backgroundColor: "rgb(214, 89, 89)"
                    }, px: 4, marginLeft: '20px',
                  }}>Check</Button>
                </Box>
              </CardContent>
            </Card>
          }

          <CardContainer category={product.category} title='Related Items' cardLimit='5' />
        </>
      ) : (
        <Typography variant="h6">Product not found!</Typography>
      )}
    </>
  );
}

export default ProductPage;
