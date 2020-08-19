import { constants } from "../constants";
import initialState from "./initialState";

const buttonLoaderReducer = (state = initialState.buttonLoader, action) => {
  switch (action.type) {
    case constants.SHOW_LOADER:
      return true;
      break;
    case constants.HIDE_LOADER:
      return false;
    default:
      return state;
      break;
  }
};

export default buttonLoaderReducer;
