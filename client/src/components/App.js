import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./commons/Header";
import HomePage from "./home/HomePage";
import SigninPage from "./auth/SigninPage";
import SignupPage from "./auth/SignupPage";
import ProfilePage from "./profile/ProfilePage";
import CreatePostPage from "./posts/CreatePostPage";
import PageNotFound from "./PageNotFound";
import { PrivateRoute } from "./PrivateRouter";

import { useSelector } from "react-redux";

function App() {
  const signedIn = useSelector((state) => {
    return state.authentication.signedIn;
  });
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/signin">
          {signedIn ? <Redirect to="/" /> : <SigninPage />}
        </Route>
        <Route exact path="/signup">
          {signedIn ? <Redirect to="/" /> : <SignupPage />}
        </Route>
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/create-post" component={CreatePostPage} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
