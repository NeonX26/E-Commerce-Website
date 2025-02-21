import React from 'react'
import CardContainer from '../productCard/CardContainer'
import Navbar from '../navbar/Navbar'

const Wishlist = () => {
  return (
    <>
      <Navbar />
      <CardContainer category="audio" title="Wishlist" cardLimit='4' />
    </>
  )
}

export default Wishlist