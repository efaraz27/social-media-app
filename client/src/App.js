import { useEffect, React } from "react";
import axios from "./helpers/axios";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { signout, updateUser } from "./redux/auth/authActions";
import Profile from "./pages/Profile";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isLoggedIn = () => {
    axios
      .post(`/isSignedIn`, { token: `${auth.token}` })
      .then((res) => {
        console.log("Already logged in");
        dispatch(updateUser(auth.user._id));
      })
      .catch((error) => {
        dispatch(signout());
      });
  };
  useEffect(() => {
    isLoggedIn();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/user" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
