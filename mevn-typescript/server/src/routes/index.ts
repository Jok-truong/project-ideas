import { Router } from "express";
import Task from "~/models/Taks";

const router = Router();

router.post("/tasks", async (req, res) => {
  try {
    console.log(req.body, "req.body");

    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
