import { constants } from "../constants";
import initialState from "./initialState";

const authenticationReducer = (state = initialState.authentication, action) => {
  switch (action.type) {
    case constants.SIGNIN_REQUEST:
      return {
        signingIn: true,
      };
    case constants.SIGNIN_SUCCESS:
      return {
        signedIn: true,
        user: action.payload.user,
      };
    case constants.SIGNIN_FAILURE:
      return {};
    case constants.SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default authenticationReducer;
