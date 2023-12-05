// build your `/api/tasks` router here
const express = require("express");
const taskModel = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await taskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.getById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const task = req.body;
  
  try {
    const newTask = await taskModel.create(task);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
