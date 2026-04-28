
import express from "express";
import {
  getOctoberTopicsAndTasks,
  getCompanyDrivesBetweenDates,
  getCompanyDrivesWithStudents,
  getUserCodekataCount,
  getMentorsMoreThan15Mentees,
  getAbsentAndTaskNotSubmittedUsers,
} from "../controllers/zen.controller.js";

const router = express.Router();

router.get("/october-topics-tasks", getOctoberTopicsAndTasks);
router.get("/company-drives-oct15-oct31", getCompanyDrivesBetweenDates);
router.get("/company-drives-students", getCompanyDrivesWithStudents);
router.get("/codekata/:userId", getUserCodekataCount);
router.get("/mentors-more-than-15", getMentorsMoreThan15Mentees);
router.get("/absent-task-not-submitted", getAbsentAndTaskNotSubmittedUsers);

export default router;