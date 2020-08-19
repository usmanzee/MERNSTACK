import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";

const Header = () => {
  const history = useHistory();
  const signedIn = useSelector((state) => {
    return state.authentication.signedIn;
  });
  const dispatch = useDispatch();
  const logoutClickHandler = (event) => {
    dispatch(userActions.signout(history));
    history.push("/");
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <NavLink to="/" className="brand-logo left">
            Instagram
          </NavLink>
          <ul id="nav-mobile" className="right">
            {!signedIn && (
              <>
                <li>
                  <NavLink to="/signin">Signin</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </>
            )}

            {signedIn && (
              <>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/create-post">Create Post</NavLink>
                </li>
                <li>
                  <button
                    className="waves-effect waves-light btn"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
