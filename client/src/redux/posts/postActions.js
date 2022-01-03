import axios from "../../helpers/axios";
import {
  GET_TOP_POSTS_REQUEST,
  GET_TOP_POSTS_SUCCESS,
  GET_TOP_POSTS_FAILURE,
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT,
} from "./postTypes";

export const fetchTopPosts = () => {
  return async (dispatch) => {
    console.log("fetching...");
    dispatch({ type: GET_TOP_POSTS_REQUEST });
    const res = await axios.post(`/posts/getTopPosts`, {});
    if (res.status === 200) {
      dispatch({ type: GET_TOP_POSTS_SUCCESS, payload: res.data.posts });
      console.log("done");
    } else if (res.status === 400) {
      dispatch({ type: GET_TOP_POSTS_FAILURE, payload: res.data.error });
      console.log("error");
    }
  };
};

export const submitPost = (formData, authToken) => {
  return async (dispatch) => {
    console.log("submitting...");
    dispatch({ type: SUBMIT_POST_REQUEST });
    await axios({
      method: "post",
      url: "/posts/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          dispatch({ type: SUBMIT_POST_SUCCESS, payload: response.data.post });
          console.log("Success");
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SUBMIT_POST_FAILURE, payload: err });
      });
  };
};

export const like = (id, userId) => {
  return async (dispatch) => {
    axios
      .post(`posts/likePost`, { id: `${id}`, userId: `${userId}` })
      .then((res) => {
        console.log(res.data.post);
        dispatch({ type: LIKE_POST, payload: res.data.post });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const unlike = (id, userId) => {
  return async (dispatch) => {
    axios
      .post(`posts/unlikePost`, { id: `${id}`, userId: `${userId}` })
      .then((res) => {
        console.log(res.data.post);
        axios
          .get(`/posts/getPost/?id=${id}`)
          .then((res) => {
            dispatch({ type: UNLIKE_POST, payload: res.data.post[0] });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addComment = (id, data, userId, userName, userPicture) => {
  return async (dispatch) => {
    axios
      .post(`/posts/addComment`, {
        id: id,
        commentData: data,
        createdById: userId,
        createdByName: userName,
        createdByPicture: userPicture,
      })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: res.data.newDocument });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
