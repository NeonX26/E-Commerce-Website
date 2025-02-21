import { Box, Button, Grid2, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProductCard from '../productCard/ProductCard';
import {useNavigate} from 'react-router-dom';


const CardContainer = ({ category, title, cardLimit,button }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch the products once when the component mounts
    useEffect(() => {
        async function getInfo() {
            try {
                const response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category}&limit=${cardLimit}`);
                const json = await response.json();
                setProducts(json.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        getInfo();
    }, []);
    return (
        <>
            <Grid2 container justifyContent="center" flexDirection={'column'} sx={{ mx: { md: 5 }, mb: 2, backgroundColor: '#f5f5f5', my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Typography variant="h4" sx={{ pl: 4, py: 2 }} >
                        {title}
                        {title === 'Wishlist' ? `(${products.length})` : ''}
                    </Typography>
                    {
                        button?<Button sx={{ mr: 4, my: 2 ,backgroundColor:'#DB4444'}} variant="contained"
                        onClick={() => {
                            navigate(`/product-list/${category}`);
                        }}>View All</Button>: ''
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', pb: 2 }} gutterBottom>
                    {products.map((product) => (
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
        </>
    )
}

export default CardContainer