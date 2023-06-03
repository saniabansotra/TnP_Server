const mongoose = require("mongoose");
const jobschema = new mongoose.Schema({
  Company_name: String,
  Job_role: String,
  job_location: String,
  Salary: Number,
  Vacancy: Number,
  Branch_eligibility: Array,
  Min_CGP: Number,
  Deadline: Number,
});
const jobmodel = mongoose.model("Jobs", jobschema);
module.exports = jobmodel;
