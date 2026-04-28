// models/codekata.model.js
import mongoose from "mongoose";

const codekataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemsSolved: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Codekata = mongoose.model("Codekata", codekataSchema);