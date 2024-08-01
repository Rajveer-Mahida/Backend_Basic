const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Chai ");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
