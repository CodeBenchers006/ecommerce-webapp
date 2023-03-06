import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Budget Basket (CodeBenchers006)
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const body = {
  email: null,
  password: null,
  name: null,
};

export default function Register() {
  const sucessRegistered = () => {
    Swal.fire({
      title: "Success",
      text: "User registered successfully",
      icon: "success",
      confirmButtonText: "Login",
    });
  };

  const failedRegistered = () => {
    Swal.fire({
      title: "Failed",
      text: "Something went wrong.Please Try Again!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  const navigate = useNavigate();

  const baseURL = "http://localhost:8081/";

  const [user, setUser] = useState(body);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      fname: data.get("fname"),
      lname: data.get("lname"),
      confirmPassword: data.get("confirmPassword"),
    });

    if (
      data.get("password").length >= 6 &&
      data.get("password") === data.get("confirmPassword")
    ) {
      //success password check - call signup API
      const user = {
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("fname") + " " + data.get("lname"),
      };
      setUser(user);
      console.log(user);

      await axios
        .post(
          baseURL + "user/signup",
          user,
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          {
            mode: "cors",
          }
        )

        .then(() => {
          sucessRegistered();
          navigate("/");
        })
        .catch((err) => console.log(err.message));
    } else {
      //failed password check
      failedRegistered();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <div className="d-flex gap-10">
              <TextField
                margin="normal"
                required
                id="fname"
                label="First Name"
                name="fname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                id="lname"
                label="Last Name"
                name="lname"
                autoFocus
              />
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already a member? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
