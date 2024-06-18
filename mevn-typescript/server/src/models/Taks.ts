import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = model("Task", TaskSchema);

export default Task;
