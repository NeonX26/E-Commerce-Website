import React from "react";
import { Container, Grid, Link, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";
import AppStore from "../../assets/AppStore.png";
import PlayStore from "../../assets/PlayStore.png";

const FooterWrapper = styled("div")({
  backgroundColor: "#232F3E",
  color: "#fff",
  padding: "40px 0",
  marginTop: "auto",
});

const FooterLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
  marginTop: "8px",
  display: "block",
  "&:hover": {
    textDecoration: "underline",
  },
});

const DividerStyled = styled(Divider)({
  backgroundColor: "#555",
  margin: "16px 0",
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Grid container spacing={3}>
          {/* Customer Service Links */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h5">Support</Typography>
            <FooterLink href="#">Kranti chowk Chh Sambhaji Nagar</FooterLink>
            <FooterLink href="#">support@neonx.com</FooterLink>
            <FooterLink href="#">+91 XXXXX XXXXX</FooterLink>
          </Grid>

          {/* About Links */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h5">Account</Typography>
            <FooterLink href="#">My Account</FooterLink>
            <FooterLink href="#">Login/Register</FooterLink>
            <FooterLink href="#">Wishlist</FooterLink>
            <FooterLink href="#">Cart</FooterLink>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h5">Quick Link</Typography>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of use</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="h5">Download App</Typography>
            <FooterLink href="#">
                <img src={AppStore} alt="App Store" style={{ height: "40px" }} />
            </FooterLink>
            <FooterLink href="#">
                <img src={PlayStore} alt="App Store" style={{ height: "40px" }} />
            </FooterLink>
            
          </Grid>
        </Grid>

        <DividerStyled />

        {/* Copyright Section */}
        <Typography variant="body2" align="center" marginTop={2}>
          &copy; 2025 NeonX. All rights reserved.
        </Typography>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
