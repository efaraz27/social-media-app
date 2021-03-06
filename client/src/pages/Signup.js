import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Theme";
import { isUserLoggedIn, signup } from "../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © "}
      <Link color="primary" href="https://github.com/efaraz27">
        efaraz27
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const firstName = data.get("firstName")
    const lastName = data.get("lastName")
    const email = data.get("email")
    const password = data.get("password")
    userSignup(firstName, lastName, email, password)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLoggedIn);
    // eslint-disable-next-line
  }, []);

  const userSignup = (firstName, lastName, email, password) => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color="secondary"
                  InputLabelProps={{
                    style: {
                      color: "rgba(118, 134, 151)",
                      borderColor: "rgb(0, 30, 60)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="secondary"
                  InputLabelProps={{
                    style: {
                      color: "rgba(118, 134, 151)",
                      borderColor: "rgb(0, 30, 60)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="secondary"
                  InputLabelProps={{
                    style: {
                      color: "rgba(118, 134, 151)",
                      borderColor: "rgb(0, 30, 60)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  color="secondary"
                  InputLabelProps={{
                    style: {
                      color: "rgba(118, 134, 151)",
                      borderColor: "rgb(0, 30, 60)",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "rgb(66, 165, 245)" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
