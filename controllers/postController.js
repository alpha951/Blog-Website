const Post = require("../models/Post");
const homeStartingContent = require("../data").homeContent();
const aboutContent = require("../data").aboutContent;
const contactContent = require("../data").contactContent;

const getPost = async function (req, res) {
  const posts = await Post.find({}).sort({ updatedAt: -1 });
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
  console.log(posts);
};

const postPost = async function (req, res) {
  let title = req.body.title;
  let postContent = req.body.textContent;
  const post = await Post.create({ title: title, content: postContent });
  res.redirect("/");
};

const getPostById = async function (req, res) {
  let postId = req.params.postid;
  console.log(postId);
  const post = await Post.findOne({ _id: postId });

  if (post)
    res.render("post", { title: post.title, postContent: post.content });
  else res.redirect("/");
};

const getCompose = function (req, res) {
  res.render("compose");
};

const getAbout = function (req, res) {
  res.render("about", {
    about: aboutContent,
  });
};

const getContact = function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
};

module.exports = {
  getPost,
  postPost,
  getPostById,
  getCompose,
  getAbout,
  getContact,
};
