const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var multer = require("multer");
const Post = mongoose.model("Post");
const requireLogin = require("../middlewares/requireLogin");
const { response } = require("express");

router.get("/", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name email")
    .then((posts) => {
      return res.json({
        posts: posts,
      });
    })
    .catch((error) => {
      console.log("Error while getting posts");
    });
});

router.post("/create", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({
      error: "Please provide valid information",
    });
  }
  //File upload
  let fileNewName = "no photo.jfif";
  if (req.files !== null) {
    fileNewName = Date.now() + "-" + req.files.file.name;
    const file = req.files.file;
    file.mv(`src/public/post_images/${fileNewName}`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
  //End File upload

  //delete req.user.password;
  req.user.password = undefined; // remove user password from object

  const post = new Post({
    title: title,
    body: body,
    image: fileNewName,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({
        message: "Post saved successfully",
        post: result,
      });
    })
    .catch((error) => {
      console.log("Error while creating post");
    });
});

router.get("/user-posts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name email")
    .then((userPosts) => {
      return res.json({
        posts: userPosts,
      });
    })
    .catch((error) => {
      console.log("Error while getting my posts");
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name email")
    .exec((err, response) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.json({
          post: response,
        });
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: req.user._id },
  })
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name email")
    .exec((err, response) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.json({
          post: response,
        });
      }
    });
});

router.put("/add-comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name")
    .exec((err, response) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.json({
          post: response,
        });
      }
    });
});

router.delete("/delete/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (!post) {
        return res
          .status(400)
          .json({ error: "You are not authorized to delete this post." });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((response) => {
            return res.json({
              post: response,
              message: "Post deleted successfully.",
            });
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          });
      } else {
        return res
          .status(400)
          .json({ error: "You are not authorized to delete this post." });
      }
    });
});
router.delete("/comment/delete/:commentId", requireLogin, (req, res) => {
  Post.findOne({
    comments: { _id: req.params.commentId, postedBy: req.user._id },
  })
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name email")
    .exec((err, post) => {
      console.log(post.postedBy._id);
      console.log(req.user._id);
      console.log("err", err);

      // if (err) {
      //   return res.status(400).json({ error: err });
      // }
      // if (!post) {
      //   return res
      //     .status(400)
      //     .json({ error: "You are not authorized to delete this post." });
      // }
      // if (post.postedBy._id.toString() === req.user._id.toString()) {
      //   post
      //     .update({}, { $pull: { comments: req.params.commentId } })
      //     .then((response) => {
      //       return res.json({
      //         post: response,
      //         message: "Post deleted successfully.",
      //       });
      //     })
      //     .catch((err) => {
      //       return res.status(400).json({ error: err });
      //     });
      // } else {
      //   return res
      //     .status(400)
      //     .json({ error: "You are not authorized to delete this post." });
      // }
    });
});
module.exports = router;
