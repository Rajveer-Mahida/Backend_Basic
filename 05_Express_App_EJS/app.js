const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Users = require("./users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  Users.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/create", async (req, res) => {
  const { name, email, password, username } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    if (hash) {
      Users.create({
        name: name,
        email: email,
        username: username,
        password: password,
        hashPass: hash,
      })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      console.log(err);
      res.send("Something went wrong");
    }
  });
});

app.get("/delete", (req, res) => {
  const { id } = req.body;
  Users.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.send("No user found with this id");
      } else {
        res.send("User deleted successfully");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/update", (req, res) => {
  const { id, name, email, password, username } = req.body;

  Users.updateOne(
    { _id: id },
    { name: name, email: email, password: password, username: username }
  )
    .then((result) => {
      if (result.modifiedCount === 0 && result.matchedCount === 0) {
        res.send("No user found with this id");
      } else if (result.modifiedCount === 0 && result.matchedCount === 1) {
        res.send("No changes made");
      } else {
        res.send("User updated successfully");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/securePassword", (req, res) => {
  const { password } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    res.send(hash);
  });
});

app.get("/drop", (req, res) => {
  Users.deleteMany({})
    .then((result) => {
      res.send("All users deleted successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/checkPassword", (req, res) => {
  const { password, id } = req.body;

  Users.findOne({ _id: id }).then((result) => {
    const hash = result.hashPass;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        res.send("Password matched");
      } else {
        res.send("Password did not match");
      }
    });
  });
});

app.use("/jwt", (req, res) => {
  const token = jwt.sign(
    {
      username: "rajveer",
    },
    "669553204e9579bf29d5ab56",
    { expiresIn: "1d" }
  );

  res.send(token);
});

// Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://rajveer:NhFpOcBOhrZRv3fb@sheryians.jkmoznc.mongodb.net/"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
