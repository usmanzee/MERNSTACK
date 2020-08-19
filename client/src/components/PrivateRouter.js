import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const signedIn = useSelector((state) => {
    return state.authentication.signedIn;
  });
  return (
    <Route
      {...rest}
      render={(props) =>
        signedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
