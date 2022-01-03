import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { ThemeProvider } from "@mui/private-theming";
import { alpha } from "@mui/material/styles";
import { theme } from "../Theme";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../redux/posts/postActions";

export default function NewCommentBar(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [comment, setComment] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addComment(
        props.postId,
        comment,
        auth.user._id,
        `${auth.user.firstName} ${auth.user.lastName}`,
        auth.user.profilePicture
      )
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          m: "5px 5px",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "10px",
          border: "1px solid rgb(30, 73, 118)",
          backgroundColor: alpha("rgb(0, 30, 60)", 1),
          "&:hover": {
            backgroundColor: alpha("rgb(19,47,76)", 1),
          },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: "rgba(118, 134, 151)" }}
          placeholder="Type something positive here..."
          inputProps={{ "aria-label": "new comment bar" }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <IconButton
          type="submit"
          aria-label="search"
          style={{ right: "0px" }}
          onClick={handleSubmit}
          disabled={!auth.token || !comment}
        >
          <AddCommentIcon style={{ color: "rgb(144, 202, 249)" }} />
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
}
