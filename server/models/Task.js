const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },

  date: {
    type: String,
  },

  time: {
    type: String,
  },

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);