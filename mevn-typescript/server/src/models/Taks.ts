import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", TaskSchema);

export default Task;
