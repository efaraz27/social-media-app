const initialState = {
  loading: false,
  user: {},
  posts: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        loading: false,
        user: action.payload.user,
        posts: action.payload.posts,
        error: "",
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
