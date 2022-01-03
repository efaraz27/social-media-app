import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@mui/private-theming";
import { theme } from "../Theme";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid rgb(30, 73, 118)",
  backgroundColor: alpha("rgb(0, 30, 60)", 1),
  "&:hover": {
    backgroundColor: alpha("rgb(19,47,76)", 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "rgba(118, 134, 151)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Searchbar() {
  return (
    <ThemeProvider theme={theme}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon color="secondary"/>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </ThemeProvider>
  );
}

export default Searchbar;
