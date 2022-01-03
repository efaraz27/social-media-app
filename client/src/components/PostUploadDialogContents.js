import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import VideocamIcon from "@mui/icons-material/Videocam";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

function PostUploadDialogContents(props) {
  const [fileType, setFileType] = React.useState("image");
  const [filePreview, setFilePreview] = React.useState();

  const handleFileChange = (event) => {
    setFileType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    props.setDescription(event.target.value);
  };

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
        New Post
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "rgba(7,26,47)" }}>
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <FormControl required sx={{ minWidth: 120, my: 2 }}>
          <InputLabel
            id="demo-simple-select-required-label"
            style={{ color: "rgba(118, 134, 151)" }}
          >
            File Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={fileType}
            label="File Type *"
            onChange={handleFileChange}
            style={{ color: "#fff" }}
            disabled={props.currentFile ? true : false}
          >
            <MenuItem value={"image"}>Image</MenuItem>
            <MenuItem value={"video"}>Video</MenuItem>
          </Select>
          <FormHelperText style={{ color: "rgba(118, 134, 151)" }}>
            Required
          </FormHelperText>
        </FormControl>
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
        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          type="text"
          id="description"
          style={{ color: "#fff" }}
          value={props.description}
          onChange={handleDescriptionChange}
          InputLabelProps={{
            style: {
              color: "rgba(118, 134, 151)",
              borderColor: "rgb(0, 30, 60)",
            },
          }}
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: "rgba(7,26,47)" }}>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleSubmit}>Upload</Button>
      </DialogActions>
    </>
  );
}

export default PostUploadDialogContents;
