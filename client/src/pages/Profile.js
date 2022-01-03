import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Theme";
import ImageList from "../components/ImageList";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/user/userActions";
import { useLocation } from "react-router-dom";
import { updateUserProfile } from "../redux/user/userActions";
import UpdateProfileButton from "../components/UpdateProfileButton";
import Dialog from "@mui/material/Dialog";
import ProfileUpdateDialogContents from "../components/ProfileUpdateDialogContents";

function Profile() {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const [open, setOpen] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState();
  const [error, setError] = React.useState();
  const handleClickOpen = () => {
    console.log("Button Clicked");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(currentFile);
    setCurrentFile();
  };
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let query = useQuery();
  let id = query.get("id");
  useEffect(() => {
    dispatch(fetchUserProfile(id));
    //eslint-disable-next-line
  }, []);
  const userProfile = useSelector((state) => state.userProfile);

  const handleSubmit = () => {
    if (!currentFile) setError("Please Upload a File!");
    else if (
      currentFile.name.endsWith(".jpg") ||
      currentFile.name.endsWith(".jpeg") ||
      currentFile.name.endsWith(".png")
    ) {
      let bodyFormData = new FormData();
      bodyFormData.append("id", auth.user._id);
      bodyFormData.append("profilePicture", currentFile);
      console.log(bodyFormData);
      dispatch(updateUserProfile(bodyFormData, auth.token));
      handleClose();
    } else {
      setError("Invalid File Type!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="profile" style={{ padding: "50px" }}>
        <div
          className="header"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Avatar
            alt={`${userProfile.user.firstName} ${userProfile.user.lastName}`}
            src={`${userProfile.user.profilePicture}`}
            style={{ width: "200px", height: "200px" }}
          />
          <div style={{ diplay: "flex", flexDirection: "column" }}>
            <h1
              style={{
                color: "#fff",
                padding: "0px 140px",
              }}
            >
              {`${userProfile.user.firstName} ${userProfile.user.lastName}`}
            </h1>
            <div onClick={handleClickOpen}>
              <UpdateProfileButton
                style={{
                  color: "#fff",
                  padding: "10px 140px",
                }}
              />
            </div>
          </div>
        </div>
        <Divider
          variant="middle"
          style={{ background: "rgb(144, 202, 249)" }}
        />
        <ImageList />
        <Dialog open={open} onClose={handleClose}>
          <ProfileUpdateDialogContents
            handleClose={handleClose}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            handleSubmit={handleSubmit}
            error={error}
          />
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default Profile;
