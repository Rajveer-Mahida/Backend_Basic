const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rajveer:NhFpOcBOhrZRv3fb@sheryians.jkmoznc.mongodb.net/"
);

if (mongoose.connection) {
  console.log("Connected to MongoDB");
} else if (err) {
  console.log("Mongodb connection Failed: ", err);
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
