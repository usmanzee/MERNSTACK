import React, { useState, useEffect } from "react";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";

const SigninPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const signingIn = useSelector((state) => {
    return state.authentication.signingIn;
  });
  const dispatch = useDispatch();
  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((preValues) => {
      return { ...preValues, [name]: value };
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(userActions.signin(user, history));
  };
  return (
    <>
      <div className="mycard">
        <div className="card auth-card">
          <h2>Instagram</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={user.email}
              onChange={onInputChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              onChange={onInputChange}
            />
            <button
              type="submit"
              className="btn waves-effect waves-light"
              disabled={signingIn ? true : false}
            >
              {signingIn ? "Signing in..." : "Signin"}
            </button>
          </form>
          <h5>
            Don't have an account?<NavLink to="/signup"> signup</NavLink>
          </h5>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
