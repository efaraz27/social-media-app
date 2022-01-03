import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import VideocamIcon from "@mui/icons-material/Videocam";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

function PostUploadDialogContents(props) {
  const fileType = "image";
  const [filePreview, setFilePreview] = React.useState();

  const Input = styled("input")({
    display: "none",
  });

  const handleCapture = (e) => {
    props.setCurrentFile(e.target.files[0]);
    let url = URL.createObjectURL(e.target.files[0]);
    setFilePreview(url);
  };

  return (
    <>
      <DialogTitle style={{ backgroundColor: "rgba(7,26,47)", color: "#fff" }}>
        Update Profile Picture
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "rgba(7,26,47)" }}>
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <Stack direction="column" spacing={2}>
          {fileType === "image" ? (
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleCapture}
              />
              <Button variant="contained" component="span">
                <PhotoCamera />
                Upload
              </Button>
            </label>
          ) : (
            <label htmlFor="contained-button-file">
              <Input
                accept="video/*"
                id="contained-button-file"
                type="file"
                onChange={handleCapture}
              />
              <Button variant="contained" component="span">
                <VideocamIcon />
                Upload
              </Button>
            </label>
          )}
          {props.currentFile && fileType === "image" ? (
            <img src={filePreview} alt="invalid" style={{ height: "100px" }} />
          ) : props.currentFile && fileType === "video" ? (
            <video
              src={filePreview}
              alt="invalid"
              style={{ height: "100px" }}
            />
          ) : (
            <></>
          )}
        </Stack>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "rgba(7,26,47)" }}>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleSubmit}>Upload</Button>
      </DialogActions>
    </>
  );
}

export default PostUploadDialogContents;
