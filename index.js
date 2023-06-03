const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { connectDatabase } = require("./connection/connect");
const STUDENT_MODEL = require("./Models/Registrations");
const JOB_MODEL = require("./Models/job");
app.use(express.json());

//company can post at maximum of two jobs..............>
app.post("/api/jobdescription", async (req, res) => {
  try {
    let count = await JOB_MODEL.find({
      CompanyName: req.body.Company_name,
    }).countDocuments();
    if (count < 2) {
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
      return res.json({ success: true, message: "Company is Verified" });
    } else {~
      return res.json({
        success: false,
        message: "Cannot post more than two jobs",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
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
app.post("/api/registration", async (req, res) => {
  try {
    let count = await STUDENT_MODEL.find({
      Job_ID: req.body.id,
      email_ID: req.body.email,
    }).countDocuments();
    if (count < 1) {
      const count = await STUDENT_MODEL.find(JobID.find);
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
    } else {
      return res.json({ success: false, message: "already applied" });
    }
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});
// app.get("/api/registration", async (req, res) => {
//   try {
//     const student = await STUDENT_MODEL.find();
//     return res.json({ success: true, data: student });
//   } catch (error) {
//     return res.json({ success: false, error: error.message });
//   }
// });
//tnp can change job status of the student...............>
app.put("/api/updateby_tnp/:id", async (req, res) => {
  try {
    const data = await STUDENT_MODEL.findByIdAndUpdate(req.params.id, {
      Job_Status: "Shortlisted",
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});
// changes in job details by tnp............>
app.put("/api/updatejobdetails_by_tnp/:id", async (req, res) => {
  try {
    const data = await JOB_MODEL.findByIdAndUpdate(req.params.id, {
      Company_name: "Zeyfron",
      Job_role: "Backend Developer",
      job_location: "Germany",
      Salary: "5500000",
      Vacancy: "10",
      Branch_eligibility: "CSE, ECE",
      Min_CGPA: "7.5",
      Deadline: 30062023,
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});
///////////student can change their Registration Details if required....................>
app.put("/api/update_by_student/:id", async (req, res) => {
  try {
    const data = await STUDENT_MODEL.findByIdAndUpdate(req.body.id, {
      Student_phone_number: "89302987292",
      Student_address: "Lucknow",
    });
    return res.json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});
///////////////////student must be able to view all the job postings applied
app.post("/api/view_postings_by_students/:email/:id", async (req, res) => {
  try {
    const postings = await STUDENT_MODEL.find({
      Student_email: req.params.email,
      JobId: req.params.id,
    });
    return res.json({ success: true, data: postings });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message });
  }
});

// TnP can see all the hired/shortlisted/rejected students for a compny..............>
app.post("/api/hi_sh_re_students", async (req, res) => {
  try {
    const students = await STUDENT_MODEL.find({
      Job_Status: req.params.status,
    });
    return res.json({ success: true, data: students });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message });
  }
});

//////////////////student can see job postings according to their branch and cgpa..............>
app.post("/api/postingsBy/:branch/:cgpa", async (req, res) => {
  try {
    const cgpa = parseFloat(req.params.cgpa);
    const postings = await JOB_MODEL.find({
      Branch_eligibility: { $in: req.params.eligibility },
      Min_CGPA: { $lte: cgpa },
    });
    return res.json({ success: true, data: postings });
  } catch (error) {
    console.log(error);
    return res.status.json({ success: false, error: error.message });
  }
});
// tnp can delete job postings if required.....................>
app.delete("/api/delete_postings:/id", async (req, res) => {
  try {
    const delete_postings = await JOB_MODEL.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message });
  }
});
// student can delete registrations if required.....................>
app.delete("/api/Stu_delete_postings:/id", async (req, res) => {
  try {
    const stu_delete_postings = await STUDENT_MODEL.findByIdAndDelete(
      req.params.id
    );
    return res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message });
  }
});

connectDatabase();
const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
