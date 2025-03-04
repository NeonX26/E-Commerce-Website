import { Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ProductCard from '../productCard/ProductCard';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
    const { category } = useParams();  // Extract the product id from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();
    // console.log(category)

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category}`);
                const data = await response.json();
                setProduct(data.products);
                setLoading(false);
                // console.log(data.products)
            } catch (error) {
                console.error("Error fetching product details:", error);
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, []);
    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 4, md: 8 }, pl: { xs: 2, md: 10 }, width: '100%' }}>
                <Typography variant="body1" onClick={() => Navigate('/')} sx={{ cursor: 'pointer', fontSize: { xs: 12, md: 15 } }}>HOME /</Typography>
                <Typography variant="body1" sx={{ cursor: 'pointer', textTransform: 'uppercase', fontSize: { xs: 12, md: 15 } }}> {category} </Typography>
            </Box>

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
                <Grid2 container justifyContent="center" flexDirection={'column'} sx={{ mx: { md: 5 }, mb: 2, backgroundColor: '#f5f5f5', my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography variant="h4" sx={{ pl: 4, py: 2, fontSize:{xs:'25px'} }} >
                            {category.toUpperCase()}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', pb: 2 }} gutterBottom>
                        {product.map((product) => (
                            <Grid2 item key={product.id} sx={{ m: 1 }}>
                                <ProductCard
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    id={product.id}
                                />
                            </Grid2>
                        ))}
                    </Box>
                </Grid2>
            ) : (
                <Typography variant="h6">Product not found!</Typography>
            )}
        </>
    )
}

export default ProductList