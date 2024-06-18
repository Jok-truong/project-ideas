import { Router } from "express";

const router = Router();

router.post("/tasks", (req, res) => {
  res.status(200).json({ message: "Task created" });
});

export default router;
