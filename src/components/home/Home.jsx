import React from 'react';
import CardContainer from '../productCard/CardContainer';
import Carousel from './Carousel';
import Navbar from '../navbar/Navbar';

const Home = () => {

    return (
        <>
            <Navbar />
            <Carousel />
            <CardContainer category="tv" title="Tv" cardLimit='6' button='true' />
            <CardContainer category="audio" title="Audio" cardLimit='6' button='true'/>
            <CardContainer category="laptop" title="Laptop" cardLimit='6' button='true'/>
            <CardContainer category="mobile" title="Mobile" cardLimit='6' button='true'/>
            <CardContainer category="gaming" title="Gaming" cardLimit='6' button='true'/>
            <CardContainer category="appliances" title="Appliances" cardLimit='6' button='true'/>
        </>
    )
};

export default Home;
