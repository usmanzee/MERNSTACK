import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";

const SignupPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const signingUp = useSelector((state) => {
    return state.registeration.signingUp;
  });
  console.log(signingUp);
  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((preValues) => {
      return { ...preValues, [name]: value };
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    dispatch(userActions.signup(user, history));
    // await axios
    //   .post(`${process.env.REACT_APP_BASE_URL}/signup`, user)
    //   .then((response) => {
    //     if (response.data.error) {
    //       toast.error(response.data.error);
    //     } else {
    //       toast.success(response.data.message);
    //       history.push("/signin");
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       toast.error(error.response.data.error);
    //     }
    //     console.log("Error while sending request to server " + error);
    //   });
  };
  return (
    <>
      <div className="mycard">
        <div className="card auth-card">
          <h2>Instagram</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={user.name}
              onChange={onInputChange}
            />
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
              disabled={signingUp ? true : false}
            >
              {signingUp ? "Signing up..." : "Signup"}
            </button>
          </form>
          <h5>
            Already have an account?
            <NavLink to="/signin"> Signin</NavLink>
          </h5>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
