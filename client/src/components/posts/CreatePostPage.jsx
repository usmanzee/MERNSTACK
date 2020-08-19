import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../redux/actions/postsActions";

const CreatePostPage = () => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [image, setImage] = useState(null);
  const history = useHistory();
  const creatingPost = useSelector((state) => {
    return state.posts.creatingPost;
  });
  // const buttonLoader = useSelector((state) => {
  //   return state.buttonLoader;
  // });

  const dispatch = useDispatch();
  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPost((preValues) => {
      return {
        ...preValues,
        [name]: value,
      };
    });
  };
  const onFileInputChange = (event) => {
    setImage(event.target.files[0]);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("title", post.title);
    data.append("body", post.body);

    dispatch(postsActions.createPost(data, history));
  };
  return (
    <>
      <div
        className="card input-field"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={post.title}
            onChange={onInputChange}
          />
          <input
            type="text"
            placeholder="Enter Body"
            name="body"
            value={post.body}
            onChange={onInputChange}
          />
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" onChange={onFileInputChange} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          {creatingPost ? (
            <div className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          ) : (
            <button className="btn waves-effect waves-light">
              Create Post
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreatePostPage;
