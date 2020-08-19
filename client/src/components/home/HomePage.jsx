import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../redux/actions/postsActions";

const HomePage = () => {
  const user = useSelector((state) => state.authentication.user);
  const posts = useSelector((state) => {
    return state.posts.allPosts;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(postsActions.loadAllPosts());
    }
  }, []);

  const postLikeHandler = (id, type) => {
    const postObj = {
      postId: id,
    };
    dispatch(postsActions.likeUnlinePost(postObj, type));
  };
  const commentSubmitHandler = (event, postId) => {
    event.preventDefault();
    const commentText = event.target[0].value;
    dispatch(postsActions.addComment(postId, commentText));
    event.target[0].value = "";
  };
  const postDeleteHandler = (postId) => {
    dispatch(postsActions.deltePost(postId));
  };
  const commentDeleteHandler = (postId, commentId) => {
    console.log(postId, commentId);
  };
  return (
    <>
      <div className="home">
        {posts.map((post, index) => {
          return (
            <div className="card home-card" key={index}>
              <h5>
                {post.postedBy.name}
                {post.postedBy._id === user._id && (
                  <i
                    className="material-icons"
                    style={{ float: "right", cursor: "pointer" }}
                    onClick={() => {
                      postDeleteHandler(post._id);
                    }}
                  >
                    delete
                  </i>
                )}
              </h5>
              {post.image && (
                <div className="card-image">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/post_images/${post.image}`}
                    alt=""
                  />
                </div>
              )}
              <div className="card-content">
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                {post.comments.map((comment, index) => {
                  return (
                    <h6 key={index}>
                      <span style={{ fontWeight: "500" }}>
                        {comment.postedBy.name}
                      </span>{" "}
                      {comment.text}
                      {comment.postedBy._id === user._id && (
                        <i
                          className="material-icons"
                          style={{ float: "right", cursor: "pointer" }}
                          onClick={() => {
                            commentDeleteHandler(post._id, comment._id);
                          }}
                        >
                          delete
                        </i>
                      )}
                    </h6>
                  );
                })}
                {post.likes.includes(user._id) ? (
                  <i
                    className="material-icons"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      postLikeHandler(post._id, "unlike");
                    }}
                  >
                    favorite
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      postLikeHandler(post._id, "like");
                    }}
                  >
                    favorite_border
                  </i>
                )}
                <p>{post.likes.length}</p>
                <form
                  onSubmit={(event) => {
                    commentSubmitHandler(event, post._id);
                  }}
                >
                  <input type="text" placeholder="Enter comment" />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
