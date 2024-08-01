const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // res.send('Server is running...');
  res.render("index.ejs");
});

app.get("/profile/:id/:username", (req, res) => {
  const id = req.params.id;
  const username = req.params.username;
  res.send(`Profile ID: ${id} \n Profile Username: ${username}`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
