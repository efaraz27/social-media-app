import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopPosts, submitPost } from "../redux/posts/postActions";
import Dialog from "@mui/material/Dialog";
import { ThemeProvider } from "@mui/styles";
import { theme } from "../Theme";
import PostUploadDialogContents from "../components/PostUploadDialogContents";

function Homepage() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const getPosts = (action) => {
    dispatch(action());
  };
  useEffect(() => {
    getPosts(fetchTopPosts);
    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState();
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(currentFile);
    setCurrentFile();
  };

  const handleSubmit = () => {
    if (!currentFile) setError("Please Upload a File!");
    else if (
      currentFile.name.endsWith(".jpg") ||
      currentFile.name.endsWith(".jpeg") ||
      currentFile.name.endsWith(".png") ||
      currentFile.name.endsWith(".mp4")
    ) {
      let bodyFormData = new FormData();
      bodyFormData.append("postImage", currentFile);
      bodyFormData.append("createdById", `${auth.user._id}`);
      bodyFormData.append("description", description);
      bodyFormData.append(
        "createdByName",
        `${auth.user.firstName} ${auth.user.lastName}`
      );
      bodyFormData.append("createdByPicture", `${auth.user.profilePicture}`);
      dispatch(submitPost(bodyFormData, auth.token));
      handleClose();
    } else {
      setError("Invalid File Type!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="homepage">
        <Navbar />
        <div
          className="posts"
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          {posts.fetchingTopPosts ? (
            <CircularProgress style={{ padding: "10px", margin: "auto" }} />
          ) : (
            <div className="posts">
              {posts.topPosts.map((post) => (
                <Post
                  creator={post.createdById}
                  description={post.description}
                  media={post.file}
                  creatorName={post.createdByName}
                  creatorAvatar={post.createdByPicture}
                  key={post._id}
                  postLikes={post.likes}
                  postId={post._id}
                  postComments={post.comments}
                />
              ))}
            </div>
          )}
          {auth.token ? (
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                margin: "0",
                top: "auto",
                right: "30px",
                bottom: "30px",
                left: "auto",
                position: "fixed",
              }}
              onClick={handleClickOpen}
            >
              <AddIcon />
            </Fab>
          ) : (
            <></>
          )}
          <Dialog open={open} onClose={handleClose}>
            <PostUploadDialogContents
              handleClose={handleClose}
              currentFile={currentFile}
              setCurrentFile={setCurrentFile}
              handleSubmit={handleSubmit}
              description={description}
              setDescription={setDescription}
              error={error}
            />
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Homepage;
