// models/topic.model.js
import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    topicName: { type: String, required: true },
    taughtDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Topic = mongoose.model("Topic", topicSchema);