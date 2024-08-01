const express = require("express");
const Users = require("./user.model");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {


  const createdUser = await Users.create({
    name: "Demo User",
    email: "demo@mail.con",
    password: "demopassworf",
  });

  res.send(createdUser);
});

app.get("/update", (req, res) => {
  Users.updateOne({ name: "Ravi" }, { name: "Rajveer Singh" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/find", (req, res) => {
  Users.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/delete", (req, res) => {
  Users.deleteOne({ name: "Priya Patel" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
