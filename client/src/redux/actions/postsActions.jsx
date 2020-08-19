import { constants } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ButtonLoaderActions } from "../actions/ButtonLoaderActions";

const createPost = (post, history) => {
  return (dispatch) => {
    dispatch(request());
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/posts/create`, post, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          dispatch(failure());
          toast.error(response.data.error);
        } else {
          dispatch(success(response.data.post));
          toast.success(response.data.message);
          history.push("/");
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
    return {
      type: constants.CREATE_POST_REQUEST,
    };
  }
  function success(post) {
    return {
      type: constants.CREATE_POST_SUCCESS,
      payload: {
        post: post,
      },
    };
  }
  function failure() {
    return {
      type: constants.CREATE_POST_FAILURE,
    };
  }
};

const loadAllPosts = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        dispatch(success(response.data.posts));
      })
      .catch((error) => {
        toast.error("Unknown error occur while processing request.");
      });
  };
  function success(posts) {
    return {
      type: constants.LOAD_ALL_POSTS_SUCCESS,
      payload: {
        posts,
      },
    };
  }
};

const loadUserPosts = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/posts/user-posts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        //console.log(response);
        dispatch(success(response.data.posts));
      })
      .catch((error) => {
        toast.error("Unknown error occur while processing request.");
      });
  };

  function success(posts) {
    return {
      type: constants.LOAD_USER_POSTS_SUCCESS,
      payload: {
        posts,
      },
    };
  }
};

const likeUnlinePost = (postObj, endUrl) => {
  return (dispatch) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/posts/${endUrl}`, postObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          dispatch(likeUnlikePostSuccess(response.data.post));
        }
      })
      .catch((error) => {
        toast.error("Unknown error occur while processing request.");
      });
  };
  function likeUnlikePostSuccess(post) {
    return {
      type: constants.LIKE_UNLIKE_POST_SUCCESS,
      payload: {
        post,
      },
    };
  }
};

const addComment = (postId, comment) => {
  return (dispatch) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/posts/add-comment`,
        { postId, text: comment },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          dispatch(addCommentSuccess(response.data.post));
        }
      })
      .catch((error) => {
        toast.error("Unknown error occur while processing request.");
      });
  };
  function addCommentSuccess(post) {
    return {
      type: constants.ADD_COMMENT_SUCCESS,
      payload: {
        post,
      },
    };
  }
};

const deltePost = (postId) => {
  return (dispatch) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/posts/delete/${postId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          dispatch(deletePostSuccess(response.data.post));
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Unknown error occur while processing request.");
      });
  };
  function deletePostSuccess(post) {
    return {
      type: constants.DELETE_POST_SUCCESS,
      payload: {
        post,
      },
    };
  }
};

export const postsActions = {
  createPost,
  loadAllPosts,
  loadUserPosts,
  likeUnlinePost,
  addComment,
  deltePost,
};
