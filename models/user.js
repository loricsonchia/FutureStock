//schema to create new users

const mongoose = require("mongoose");

//creating json object
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
