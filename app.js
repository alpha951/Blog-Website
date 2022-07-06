//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const data = require(__dirname + "/data.js");
const _ = require("lodash");
const e = require("express");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent = data.homeContent();
const aboutContent = data.aboutContent;
const contactContent = data.contactContent;

//! dynamic data is here
let posts = [];

mongoose.connect(
  "mongodb+srv://alpha951:keshavsmart@cluster0.ov1ir.mongodb.net/blogDB"
);

const postSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model("Post", postSchema);

const defualtPost = new Post({
  title: homeStartingContent.title,
  content: homeStartingContent.postContent,
});

app.get("/", function (req, res) {
  // res.render("home", {
  //   posts: posts,
  // });
  //! finding from Post collection
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
  console.log(posts);
});

app.post("/compose", function (req, res) {
  let title = req.body.title;
  let postContent = req.body.textContent;
  const newPost = new Post({
    title: title,
    content: postContent,
  });
  const post = { title: title, postContent: postContent };
  // posts.push(post);
  newPost.save(function (err) {
    if (!err) res.redirect("/");
  });
});

app.get("/posts/:postid", function (req, res) {
  let postId = req.params.postid;
  console.log(postId);
  Post.findOne({ _id: postId }, function (err, result) {
    if (err) console.log(err);
    else {
      res.render("post", { title: result.title, postContent: result.content });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    about: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started succesfully");
});
