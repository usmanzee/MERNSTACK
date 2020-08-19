import { constants } from "../constants";
import initialState from "./initialState";
const registerationReducer = (state = initialState.registeration, action) => {
  switch (action.type) {
    case constants.SIGNUP_REQUEST:
      return {
        signingUp: true,
      };
    case constants.SIGNUP_SUCCESS:
      return {};
    case constants.SIGNUP_FAILURE:
      return {};
      break;
    default:
      return state;
      break;
  }
};

export default registerationReducer;
