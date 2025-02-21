import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container, Grid } from "@mui/material";
import image from "../../assets/loginImg.jpg"; // Use the same image or replace with another
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Reset error on successful validation
    setError("");

    // Implement sign-up logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);

    // Example: clear form after submission
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
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
              padding: "30px",
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "16px" }}
              >
                Sign Up
              </Button>
            </form>

            <Grid container justifyContent="center" sx={{ marginTop: "16px" }}>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Already have an account?{" "}
                  <Button color="primary" onClick={() => navigate("/signin")}>
                    Sign In
                  </Button>
                </Typography>
              </Grid>
            </Grid>
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
            <img src={image} alt="signup" style={{ width: "100%" }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
