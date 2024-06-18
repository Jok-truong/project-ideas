import { Router } from "express";
import Task from "~/models/Taks";

const router = Router();

router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const tasks = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
