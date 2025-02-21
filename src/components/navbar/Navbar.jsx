import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Badge, Menu, MenuItem, Typography, Hidden } from "@mui/material";
import { Search, ShoppingCart, AccountCircle, FavoriteBorder } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Navigate, useNavigate } from 'react-router-dom';
import Context from "../../context/Context";

const SearchWrapper = styled("div")({
  position: "relative",
  borderRadius: "5px",
  backgroundColor: "#f3f3f3",
  marginRight: "20px",
  width: "100%",
  maxWidth: "600px",
  display: "flex",
  alignItems: "center",
});

const Navbar = (props) => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = React.useContext(Context);
  const cartCount = cart.length;

  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <AppBar position="sticky" color="transparent" sx={{ boxShadow: "none", borderBottom: "1px solid #f3f3f3", backgroundColor: "#fff" }}>
      <Toolbar>
        {/* <img
          src={logo}
          alt="Amazon "
          style={{ width: "150px", height: "auto" }}
        /> */}
        <Typography variant="h6" component="h1" style={{ flexGrow: 1 }} sx
          ={{
            color: "black",
            fontWeight: "bold",
            fontSize: "2rem",
            fontFamily: "Roboto",
            letterSpacing: "2px",
            pl: "10px",
          }}>
          NeonX
        </Typography>

        <Hidden smDown>
          <SearchWrapper>
            <InputBase
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ padding: "5px 10px", width: "100%" }}
            />
            <IconButton type="submit" style={{ padding: "10px" }}>
              <Search />
            </IconButton>
          </SearchWrapper>
        </Hidden>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="inherit" onClick={() => Navigate('/wishlist')}>
          <FavoriteBorder />
        </IconButton>


        <IconButton color="inherit" onClick={()=> Navigate('/cart')}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <IconButton
          color="inherit"
          onClick={handleAccountMenu}
          aria-controls="account-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={()=>{
            handleMenuClose();
            Navigate('/signin');
          }
          }>Sign In</MenuItem>
          <MenuItem onClick={handleMenuClose}>Your Account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
