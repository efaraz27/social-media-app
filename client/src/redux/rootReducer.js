import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import postReducer from "./posts/postReducers";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  userProfile: userReducer,
});

export default rootReducer;
