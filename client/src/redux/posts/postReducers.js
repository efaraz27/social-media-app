const initialState = {
  fetchingTopPosts: true,
  topPostsFetched: false,
  topPosts: [],
  submitPost: false,
  postSubmitted: false,
  error: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOP_POSTS_REQUEST":
      return {
        ...state,
        fetchingTopPosts: true,
        topPostsFetched: false,
      };
    case "GET_TOP_POSTS_SUCCESS":
      return {
        ...state,
        fetchingTopPosts: false,
        topPosts: action.payload,
        topPostsFetched: true,
        error: "",
      };
    case "GET_TOP_POSTS_FAILURE":
      return {
        ...state,
        fetchingTopPosts: true,
        topPostsFetched: false,
        topPosts: [],
        error: action.payload,
      };
    case "SUBMIT_POST_REQUEST":
      return {
        ...state,
        postSubmit: true,
      };
    case "SUBMIT_POST_SUCCESS":
      return {
        ...state,
        postSubmitted: true,
        topPosts: [action.payload, ...state.topPosts],
        postSubmit: false,
      };
    case "SUBMIT_POST_FAILURE":
      return {
        ...state,
        error: action.payload,
        postSubmit: false,
        postSubmitted: false,
      };
    case "LIKE_POST":
      let newArray = [];
      for (var i = 0; i < state.topPosts.length; i++) {
        if (state.topPosts[i]._id === action.payload._id)
          newArray.push(action.payload);
        else newArray.push(state.topPosts[i]);
      }
      console.log(newArray);
      return {
        ...state,
        topPosts: newArray,
      };
    case "UNLIKE_POST":
      let anotherNewArray = [];
      for (var j = 0; j < state.topPosts.length; j++) {
        if (state.topPosts[j]._id === action.payload._id)
          anotherNewArray.push(action.payload);
        else anotherNewArray.push(state.topPosts[j]);
      }
      return {
        ...state,
        topPosts: anotherNewArray,
      };
    case "ADD_COMMENT":
      console.log("recieved id:");
      console.log(action.payload._id);
      let newPostsArray = [];
      for (var k = 0; k < state.topPosts.length; k++) {
        if (state.topPosts[k]._id === action.payload._id)
          newPostsArray.push(action.payload);
        else newPostsArray.push(state.topPosts[k]);
      }
      console.log(newPostsArray);
      return {
        ...state,
        topPosts: newPostsArray,
      };
    default:
      return state;
  }
};

export default postReducer;
