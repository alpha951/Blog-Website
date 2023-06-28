const mongoose = require("mongoose");
const { db } = require("../models/Post");

const dbConnect = (url) =>  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = dbConnect;