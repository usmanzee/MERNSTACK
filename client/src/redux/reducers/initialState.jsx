let user = JSON.parse(localStorage.getItem("user"));
export default {
  buttonLoader: false,
  authentication: user ? { signedIn: true, user } : {},
  registeration: {},
  posts: {
    creatingPost: false,
    allPosts: [],
    userPosts: [],
  },
};
