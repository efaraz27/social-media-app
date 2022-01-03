import axios from "../../helpers/axios";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./userTypes";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUsersSuccess = (user, posts) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { user, posts },
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchUserProfile = (query) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest);
    axios
      .get(`posts/getUserPosts?id=${query}`)
      .then((response) => {
        const { user, posts } = response.data;
        dispatch(fetchUsersSuccess(user, posts));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};

export const updateUserProfile = (formData, authToken) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    await axios({
      method: "post",
      url: "/updateUser",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: UPDATE_USER_SUCCESS });
          console.log("Success");
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UPDATE_USER_FAILURE, payload: err });
      });
  };
};
