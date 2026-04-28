
import { Topic } from "../models/topic.model.js";
import { Task } from "../models/task.model.js";
import { CompanyDrive } from "../models/companyDrive.model.js";
import { Codekata } from "../models/codekata.model.js";
import { Mentor } from "../models/mentor.model.js";
import { Attendance } from "../models/attendance.model.js";

//October month er topics and tasks
export const getOctoberTopicsAndTasks = async (req, res) => {
  const start = new Date("2020-10-01");
  const end = new Date("2020-11-01");

  const topics = await Topic.find({
    taughtDate: { $gte: start, $lt: end },
  });

  const tasks = await Task.find({
    assignedDate: { $gte: start, $lt: end },
  }).populate("topic");

  res.json({ topics, tasks });
};

// 15 Oct 2020 to 31 Oct 2020 company drives
export const getCompanyDrivesBetweenDates = async (req, res) => {
  const start = new Date("2020-10-15");
  const end = new Date("2020-11-01");

  const drives = await CompanyDrive.find({
    driveDate: { $gte: start, $lt: end },
  });

  res.json(drives);
};

// Company drives and appeared students
export const getCompanyDrivesWithStudents = async (req, res) => {
  const drives = await CompanyDrive.find().populate(
    "appearedStudents",
    "name email"
  );

  res.json(drives);
};

// User codekata solved count
export const getUserCodekataCount = async (req, res) => {
  const { userId } = req.params;

  const codekata = await Codekata.findOne({ user: userId }).populate(
    "user",
    "name email"
  );

  res.json({
    user: codekata?.user,
    problemsSolved: codekata?.problemsSolved || 0,
  });
};

// Mentors whose mentee count more than 15
export const getMentorsMoreThan15Mentees = async (req, res) => {
  const mentors = await Mentor.aggregate([
    {
      $project: {
        name: 1,
        email: 1,
        menteeCount: { $size: "$mentees" },
      },
    },
    {
      $match: {
        menteeCount: { $gt: 15 },
      },
    },
  ]);

  res.json(mentors);
};

// Absent users and task not submitted between 15 Oct to 31 Oct
export const getAbsentAndTaskNotSubmittedUsers = async (req, res) => {
  const start = new Date("2020-10-15");
  const end = new Date("2020-11-01");

  const absentRecords = await Attendance.find({
    date: { $gte: start, $lt: end },
    status: "absent",
  }).populate("user", "name email");

  const tasks = await Task.find({
    assignedDate: { $gte: start, $lt: end },
  });

  const result = [];

  for (const record of absentRecords) {
    const userId = record.user._id.toString();

    const notSubmittedTasks = tasks.filter(
      (task) =>
        !task.submittedUsers
          .map((id) => id.toString())
          .includes(userId)
    );

    if (notSubmittedTasks.length > 0) {
      result.push({
        user: record.user,
        absentDate: record.date,
        notSubmittedTaskCount: notSubmittedTasks.length,
        notSubmittedTasks,
      });
    }
  }

  res.json({
    count: result.length,
    users: result,
  });
};