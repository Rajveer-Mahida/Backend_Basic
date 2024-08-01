const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://rajveer:NhFpOcBOhrZRv3fb@sheryians.jkmoznc.mongodb.net/`
    );
    console.log(
      " \n MongoDB connection successful : ",
      connection.connection.host
    );
  } catch (error) {
    console.log("MongoDB connection failed", error.message);
  }
};

module.exports = connectDB;
