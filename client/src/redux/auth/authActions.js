import axios from "../../helpers/axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  UPDATE_USER,
} from "./authTypes";

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    let res;
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await axios.post(`/signin`, {
        ...user,
      });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: "Something went wrong, please check your login details",
        },
      });
    }
  };
};

export const signup = (user) => {
  console.log(user);
  return async (dispatch) => {
    const res = await axios.post("/signup", {
      ...user,
    });
    if (res.status === 201) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: SIGNOUT_REQUEST });
    dispatch({ type: SIGNOUT_SUCCESS });
  };
};

export const updateUser = (id) => {
  return async (dispatch) => {
    axios
      .post(`/getUser`, { id: id })
      .then((res) => {
        console.log(res.data.user);
        dispatch({ type: UPDATE_USER, payload: res.data.user });
      })
      .catch((err) => {
        console.log(err);
        dispatch(signout());
      });
  };
};
