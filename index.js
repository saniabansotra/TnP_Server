const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { connectDatabase } = require("./connection/connect");
const STUDENT_MODEL = require("./Models/Registrations");
const JOB_MODEL = require("./Models/job");
app.use(express.json());

app.post("/api/registration", async (req, res) => {
  try {
    const student = {
      Student_name: req.body.name,
      JobId: req.body.id,
      Student_Branch: req.body.branch,
      Passout_year: req.body.passout_year,
      Student_email: req.body.email,
      Student_phone_number: req.body.number,
      Student_address: req.body.address,
      Job_Status: req.body.status,
      Job_application_Date: req.body.applicationdate,
    };
    const student1 = new STUDENT_MODEL(student);
    await student1.save();
    return res.json({ success: true, message: "Data Saved Successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
});
app.get("/api/registration", async (req, res) => {
  try {
    const student = await STUDENT_MODEL.find();
    return res.json({ success: true, data: student });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});

app.post("/api/jobdescription", async (req, res) => {
  try {
    const jobs = {
      Company_name: req.body.name,
      Job_role: req.body.role,
      job_location: req.body.location,
      Salary: req.body.salary,
      Vacancy: req.body.vacancy,
      Branch_eligibility: req.body.eligibility,
      Min_CGPA: req.body.cgpa,
      Deadline: req.body.deadlline,
    };
    const job1 = new JOB_MODEL(jobs);
    await job1.save();
    return res.json({ success: true, message: "Data Saved Successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
});
app.get("/api/jobdescription", async (req, res) => {
  try {
    const job = await JOB_MODEL.find();
    return res.json({ success: true, data: job });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});
app.put("/api/updateby_tnp:id", async (req, res) => {
  try {
    const data = await JOB_MODEL.findByIdAndUpdate(req.params.id, {
      Job_Status: "Shortlisted",
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});
app.put("/api/updatejobdetails_by_tnp:Company_name", async (req, res) => {
  try {
    const data = await JOB_MODEL.findByIdAndUpdate(req.params.Company_name, {
      Company_name: "Zeyfron",
      Job_role: "Backend Developer",
      job_location: "Germany",
      Salary: "5500000",
      Vacancy: "10",
      Branch_eligibility: "CSE, ECE",
      Min_CGPA: "7.5",
      Deadline: 30062023,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});

connectDatabase();
const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});