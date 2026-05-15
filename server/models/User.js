const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  bio: {
  type: String,
  default: "",
  },

  role: {
    type: String,
    default: "User",
  },

  skills: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);