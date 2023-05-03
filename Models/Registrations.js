const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  Student_name: String,
  JobId: Number,
  Student_Branch: String,
  Passout_year: Number,
  Student_email: String,
  Student_phone_number: Number,
  Student_address: String,
  Job_Status: String,
  Job_application_Date: Number,
});
const studentmodel = mongoose.model("Registration", studentSchema);
module.exports = studentmodel;
