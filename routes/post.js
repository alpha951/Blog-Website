const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

const {
  getPost,
  postPost,
  getPostById,
  getCompose,
  getAbout,
  getContact,
} = require("../controllers/postController");

router.route("/").get(getPost);
router.route("/compose").post(postPost);
router.route("/posts/:postid").get(getPostById);
router.route("/compose").get(getCompose);
router.route("/about").get(getAbout);
router.route("/contact").get(getContact);

module.exports = router;