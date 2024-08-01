const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "Rajveer",
    email: "demo@mail.com",
    age: 21,
  });
  res.send(user);
});

app.get("/createPost", async (req, res) => {
  const postData = await postModel.create({
    postData: "This is a post",
    user: "66a36d14d3587999f6d71901",
  });

  const user = await userModel.findOne({ _id: "66a36d14d3587999f6d71901" });
  user.posts.push(postData._id);
  await user.save();

  res.send({
    postData,
    user,
  });
});

mongoose
  .connect(
    "mongodb+srv://rajveer:NhFpOcBOhrZRv3fb@sheryians.jkmoznc.mongodb.net/demoEcommerce?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
