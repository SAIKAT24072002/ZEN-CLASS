// models/task.model.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    assignedDate: { type: Date, required: true },
    submittedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);