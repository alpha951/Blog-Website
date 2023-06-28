//jshint esversion:6
const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();
const bodyParser = require("body-parser");
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const dbConnect = require("./db/dbconnect");
const postRouter = require("./routes/post");

app.use("/", postRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI).then(() =>
      console.log("Connected to MongoDB...")
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
