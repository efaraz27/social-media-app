import * as React from "react";
import NavMenu from "./NavMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Theme";
import Stack from "@mui/material/Stack";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Drawer from "./Drawer";
import Searchbar from "./Searchbar";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import logo from "../images/logo.svg";

export default function Navbar() {
  //eslint-disable-next-line
  const { height, width } = useWindowDimensions();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const auth = useSelector((state) => state.auth);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "rgba(7,26,47)",
            padding: "5px 0px",
          }}
        >
          <Toolbar>
            {width < 600 ? <Drawer /> : <></>}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={logo}
                alt="Social Media App"
                style={{ height: "45px", transform: "translateY(5px)" }}
              />
            </Typography>
            {width >= 600 ? <Searchbar /> : <></>}
            {auth.user && auth.authenticate && auth.token ? (
              <Stack spacing={2} direction="row">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={auth.user.fullName}
                    src={auth.user.profilePicture}
                  />
                </StyledBadge>
                <NavMenu />
              </Stack>
            ) : (
              <Stack spacing={2} direction="row">
                <Button color="secondary" variant="outlined" href="/login">
                  Login
                </Button>
                <Button color="secondary" variant="contained" href="/signup">
                  Sign Up
                </Button>{" "}
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
