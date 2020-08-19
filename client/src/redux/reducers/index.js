import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
import registerationReducer from "./registerationReduer";
import postsReducer from "./postsReducer";
import buttonLoaderReducer from "./buttonLoaderReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  registeration: registerationReducer,
  posts: postsReducer,
  buttonLoader: buttonLoaderReducer,
});

export default rootReducer;
