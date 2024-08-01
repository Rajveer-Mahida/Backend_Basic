const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   postData : String,
   user : {
      type : mongoose.Schema.Types.ObjectId,
   },
   date : {
        type : Date,
        default : Date.now
   }
});

module.exports = mongoose.model("Posts", postSchema);