import { constants } from "../constants";
import initialState from "./initialState";

const postsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case constants.CREATE_POST_REQUEST:
      return {
        ...state,
        creatingPost: true,
      };
      break;
    case constants.CREATE_POST_SUCCESS:
      return {
        ...state,
        creatingPost: false,
        allPosts: [...state.allPosts, action.payload.post],
      };
      break;
    case constants.CREATE_POST_FAILURE:
      return {
        ...state,
        creatingPost: false,
      };
      break;
    case constants.LOAD_ALL_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: action.payload.posts,
      };
      break;
    case constants.LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: action.payload.posts,
      };
    case constants.LIKE_UNLIKE_POST_SUCCESS:
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          return post._id === action.payload.post._id
            ? action.payload.post
            : post;
        }),
        userPosts: state.userPosts.map((post) => {
          return post._id === action.payload.post._id
            ? action.payload.post
            : post;
        }),
      };
    case constants.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          return post._id === action.payload.post._id
            ? action.payload.post
            : post;
        }),
        userPosts: state.userPosts.map((post) => {
          return post._id === action.payload.post._id
            ? action.payload.post
            : post;
        }),
      };
    case constants.DELETE_POST_SUCCESS:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => {
          return post._id !== action.payload.post._id;
        }),
      };
    default:
      return state;
      break;
  }
};

export default postsReducer;
