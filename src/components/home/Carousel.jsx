import React from 'react';
import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';

// Import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrow: true,
    };

    return (
        <Box sx={{ justifyContent: "center", alignItems: "center", p: 5, width: "100%", display: { xs: "none", md: "block" } }}>
            <Slider {...settings}>
                <Box>
                    <img
                        src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c5293f1811918a58.jpeg?q=20"
                        alt="This is image 1"
                        width="100%"
                    />
                </Box>
                <Box>
                    <img
                        src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/7f3cde58a30f6024.jpg?q=20"
                        alt="This is image 2"
                        width="100%"
                    />
                </Box>
                <Box>
                    <img
                        src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/d9290fb51138d286.png?q=20"
                        alt="This is image 3"
                        width="100%"
                    />
                </Box>
            </Slider>
        </Box>
    );
};

export default Carousel;
