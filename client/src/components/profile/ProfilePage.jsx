import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../redux/actions/postsActions";

const ProfilePage = () => {
  const userPosts = useSelector((state) => {
    return state.posts.userPosts;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (userPosts.length === 0) {
      dispatch(postsActions.loadUserPosts());
    }
  }, []);
  return (
    <>
      <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt=""
            ></img>
          </div>
          <div>
            <h4>Muhammad Usman</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>40 posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
            </div>
          </div>
        </div>
        {userPosts.map((post, index) => {
          return (
            <div className="card home-card" key={index}>
              <h5>{post.postedBy.name}</h5>
              {post.image && (
                <div className="card-image">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/post_images/download.jfif`}
                    alt=""
                  />
                </div>
              )}
              <div className="card-content">
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <i className="material-icons">favorite_border</i>
                <input type="text" placeholder="Enter comment" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfilePage;
