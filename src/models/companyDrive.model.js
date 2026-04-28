// models/companyDrive.model.js
import mongoose from "mongoose";

const companyDriveSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    driveDate: { type: Date, required: true },
    appearedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const CompanyDrive = mongoose.model(
  "CompanyDrive",
  companyDriveSchema
);