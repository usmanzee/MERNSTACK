import { constants } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

const signin = (user, history) => {
  return (dispatch) => {
    dispatch(request());
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/signin`, user)
      .then((response) => {
        if (response.data.error) {
          dispatch(failure());
          toast.error(response.data.error);
        } else {
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success(response.data.message);
          dispatch(success(response.data.user));
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          dispatch(failure());
          toast.error(err.response.data.error);
        } else {
          dispatch(failure());
          toast.error("Unknown error occur while processing request.");
        }
      });
  };
  function request() {
    return { type: constants.SIGNIN_REQUEST };
  }
  function success(user) {
    return {
      type: constants.SIGNIN_SUCCESS,
      payload: {
        user: user,
      },
    };
  }
  function failure() {
    return { type: constants.SIGNIN_FAILURE };
  }
};

const signup = (user, history) => {
  return (dispatch) => {
    dispatch(request());
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/signup`, user)
      .then((response) => {
        if (response.data.error) {
          dispatch(failure());
          toast.error(response.data.error);
        } else {
          dispatch(success());
          toast.success(response.data.message);
          history.push("/signin");
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(failure());
          toast.error(error.response.data.error);
        } else {
          dispatch(failure());
          toast.error("Unknown error occur while processing request.");
        }
      });
  };
  function request() {
    return { type: constants.SIGNUP_REQUEST };
  }
  function success(user) {
    return {
      type: constants.SIGNUP_SUCCESS,
    };
  }
  function failure() {
    return { type: constants.SIGNUP_FAILURE };
  }
};

const signout = (history) => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  return { type: constants.SIGN_OUT };
};

export const userActions = {
  signin,
  signup,
  signout,
};
