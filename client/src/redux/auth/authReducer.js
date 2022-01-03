const initialState = {
  authenticating: false,
  authenticate: false,
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  token: null,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        authenticating: true,
      };
    case "LOGIN_SUCCESS":
      return {
        authenticating: false,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        authenticating: false,
        authenticate: false,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          picture: "",
        },
        token: null,
        error: action.payload,
      };
    case "SIGNOUT_REQUEST":
      return {
        ...state,
        authenticating: true,
      };
    case "SIGNOUT_SUCCESS":
      return {
        authenticating: false,
        authenticate: false,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          picture: "",
        },
        token: null,
        error: "",
      };
    case "SIGNOUT_FAILURE":
      return {
        authenticating: false,
        authenticate: false,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          picture: "",
        },
        token: null,
        error: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
