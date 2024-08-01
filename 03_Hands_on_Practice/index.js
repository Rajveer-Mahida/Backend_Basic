const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//Middleware to validate the input
const inputValidation = (req, res, next) => {
  const fileName = req.body.title;
  const fileContent = req.body.description;

  if (!(fileName.length > 0 && fileContent.length > 0)) {
    return res.json({ error: "Please fill all the fields" });
  }
  next();
};

// Routes

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    // console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", inputValidation, (req, res) => {
  const fileName = req.body.title.split(" ").join("_").toLowerCase();
  const fileContent = req.body.description;

  fs.writeFile(`./files/${fileName}.txt`, fileContent, (err) => {
    if (err) {
      console.log(err.message);
    }
  });

  res.redirect("/");
  //   res.send(req.body);
});

app.get("/task/:filename", (req, res) => {
  const fileName = req.params.filename;
  fs.readFile(`./files/${fileName}.txt`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    // res.send(data);
    res.render("task", { title: fileName, description: data });
  });
});

app.get("/delete/:filename", (req, res) => {
  const fileName = req.params.filename;
  fs.unlink(`./files/${fileName}.txt`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

app.post("/edit/", inputValidation, (req, res) => {
  const newName = req.body.title;
  const newContent = req.body.description;

  const oldName = req.body.oldTitle;

  fs.rename(`./files/${oldName}.txt`, `./files/${newName}.txt`, (err) => {
    if (err) {
      console.log(err);
    }
    fs.writeFile(`./files/${newName}.txt`, newContent, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  res.redirect("/");
});

app.get("/edit/:filename", (req, res) => {
  const fileName = req.params.filename;
  fs.readFile(`./files/${fileName}.txt`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("edit", { title: fileName, description: data });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
