import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Theme";
import Searchbar from "./Searchbar";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

export default function TemporaryDrawer() {
  const auth = useSelector((state) => state.auth);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const useStyles = makeStyles({
    paper: {
      background: "rgba(7,26,47)",
    },
  });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key="Search">
          <ListItemIcon>
            <Searchbar />
          </ListItemIcon>
        </ListItem>
      </List>
      {!auth.user && (
        <List>
          <ListItem button key="Login">
            <ListItemIcon>
              <Button color="secondary" variant="outlined" href="/login">
                Login
              </Button>
            </ListItemIcon>
          </ListItem>
          <ListItem button key="Login">
            <ListItemIcon>
              <Button color="secondary" variant="contained" href="/signup">
                Sign Up
              </Button>
            </ListItemIcon>
          </ListItem>
        </List>
      )}
    </Box>
  );
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment key="left">
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon color="secondary" />
        </Button>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          classes={{ paper: classes.paper }}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </ThemeProvider>
  );
}
