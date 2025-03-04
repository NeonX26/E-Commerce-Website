import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Typography, Box, Grid2, CircularProgress } from "@mui/material";
import image from "../../assets/loginImg.jpg";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setLoggedIn,setWishCount,setWishlistData } = useContext(Context)

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('heyy')
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    fetchUsers()

  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://192.168.29.144:6300/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()
      // console.log(data)
      setLoggedIn(true)
      setUser(data)
      setWishCount(data.wishlists.length)
      setWishlistData(data.wishlists)
      navigate('/')
    }
    catch (err) {
      setError('There was an error with the request: ' + err.message);
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
      {
        loading ? (
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
          </Box >
        ) :
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
              width: "100%",
              backgroundColor: "#f4f4f4",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                maxWidth: "800px",
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Left Side (Form) */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", sm: "50%" },
                  padding: { xs: '10px', sm: "30px" },
                }}
              >
                <Typography variant="h5" align="center" gutterBottom >
                  Sign In
                </Typography>

                {error && (
                  <Typography color="error" variant="body2" align="center" gutterBottom>
                    {error}
                  </Typography>
                )}

                <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toString())}
                    required
                  />

                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.toString())}
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "16px" }}
                  >
                    Sign In
                  </Button>
                </form>

                <Grid2 container justifyContent="center" sx={{ marginTop: "16px" }}>
                  <Grid2 item>
                    <Typography variant="body2" color="textSecondary">
                      Don't have an account?{" "}
                      <Button color="primary" onClick={() => navigate("/signup")}>
                        Sign Up
                      </Button>
                    </Typography>
                  </Grid2>
                </Grid2>
              </Box>

              {/* Right Side (Image) */}
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  width: "50%",
                  padding: "30px",
                }}
              >
                <img src={image} alt="login" style={{ width: "100%" }} />
              </Box>
            </Box>
          </Box>
      }

    </>
  );
};

export default SignIn;
