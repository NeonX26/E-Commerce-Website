import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ image, title, price, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <>
      <Card
        sx={{
          width: { xs: 150, sm: 200, md: 250 },
          borderRadius: 1,
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.01)',
          },
          key: title,
          padding: 1,
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          onClick={handleCardClick}
          sx={{
            objectFit: 'contain',
            backgroundColor: '#fff',
            height: { xs: 150, sm: 200, md: 220 },
          }}

        />
        <CardContent sx={{ padding: '8px' }}>
          <Typography variant="body1"
            sx={{
              maxHeight: '20px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ${price}
          </Typography>

        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
