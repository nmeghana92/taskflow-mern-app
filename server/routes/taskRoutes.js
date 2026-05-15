const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ADD TASK

router.post("/add", authMiddleware, async (req, res) => {

  try {

    const { title, description, date, time } = req.body;

    const newTask = new Task({
      userId: req.user.id,
      title,
      description,
      date,
      time,
    });

    await newTask.save();

    res.status(201).json({
      message: "Task Added Successfully",
      task: newTask,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL TASKS

router.get("/mytasks", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find({
      userId: req.user.id,
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE TASK STATUS

router.put("/update/:id", authMiddleware, async (req, res) => {

  try {

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Task Updated Successfully",
      task: updatedTask,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE TASK

router.delete("/delete/:id", authMiddleware, async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// EDIT TASK

router.put("/edit/:id", authMiddleware, async (req, res) => {

  try {

    const {
      title,
      description,
      date,
      time,
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        time,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Task Edited Successfully",
      task: updatedTask,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// EXPORT ROUTER

module.exports = router;