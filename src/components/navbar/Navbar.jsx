import React, { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton,  Badge, Menu, MenuItem, Typography,  } from "@mui/material";
import { Search, ShoppingCart, AccountCircle, FavoriteBorder } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import Context from "../../context/Context";
import Profile from '../../components/profile/Profile'



const Navbar = (props) => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart } = React.useContext(Context);
  const cartCount = cart.length;
  const { user, loggedIn , setLoggedIn,wishCount} = useContext(Context);

  // console.log(user.userInfo.name)
  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // console.log(user.wishlists.length)
  return (
    <AppBar position="sticky" color="transparent" sx={{ boxShadow: "none", borderBottom: "1px solid #f3f3f3", backgroundColor: "#fff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="h1" sx
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
        {/* <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          placeholder="Search..."
          sx={{ width: '200px' }}  // Adjust width as needed
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton type="submit">
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="h1" sx={{ color: "black", fontWeight: "bold", fontSize: "0.8rem", letterSpacing: "2px", pl: "10px" }}>
            {user ? `Hi,${user.userInfo.name}` : 'Login'}
          </Typography>
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
            {
              loggedIn ?
              <>
                <MenuItem onClick={() => {
                  handleMenuClose
                  Navigate('/profile')
                }}>Your Account</MenuItem>
                <MenuItem onClick={()=>{
                  setLoggedIn(false);
                  handleMenuClose}}>Logout</MenuItem>
                </> :

                <MenuItem onClick={() => {
                  handleMenuClose();
                  Navigate('/signin');
                }
                }>Sign In</MenuItem>

            }

            {/* <MenuItem onClick={handleMenuClose}>Orders</MenuItem> */}

            
          </Menu>

          <IconButton color="inherit" onClick={() => Navigate('/wishlist')}>
            <Badge badgeContent={wishCount} color="error">
              <FavoriteBorder />
            </Badge>
            {/* <FavoriteBorder /> */}
          </IconButton>


          <IconButton color="inherit" onClick={() => Navigate('/cart')}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
