import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Card, TextField, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ handleIsLogin }) => {
  // Adding google sign-in system
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showErrorToast = (re) => toast(re?.error, { type: "error" });
  const showSuccessToast = (re) => toast(re?.successful, { type: "success" });
  const handleSubmit = () => {
    console.log(email)  
    if(email.length===0){
      showErrorToast({error:"Please enter a valid email"});
      return;
    }
    if(password.length<=5){
      showErrorToast({error:"Please enter a valid password"});
      return;
    }
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((re) => {
        if (re?.error) {
          showErrorToast(re);
        } else {
          showSuccessToast(re);
          handleIsLogin(true)
        }
      });
  };

  return (
    <Card
      style={{
        width: "150%",
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Container style={{ alignSelf: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginTop: "15%",
                marginLeft: "14px",
              }}
            >
              <Typography variant="h5" gutterBottom component="div">
                Login
              </Typography>
              <form>
                <TextField
                  sx={{ width: "50%", m: 1 }}
                  id="standard-basic-1"
                  label="Your mail"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  variant="standard"
                />

                <TextField
                  sx={{ width: "50%", m: 1 }}
                  id="standard-basic-2"
                  label="Your password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  variant="standard"
                  type="password"
                />
                <Button
                  sx={{ width: "50%", m: 1 }}
                  varient="contained"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Login
                </Button>
              </form>
              <ToastContainer />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Card>
  );
};

export default Login;
