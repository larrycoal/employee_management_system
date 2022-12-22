const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  startDate: Date,
  retirementDate:Date,
  title: String,
  department: String,
  employeeType:String,
  currentStatus:Boolean,
});

const Employee = mongoose.model("Employee", EmployeeSchema, "Employees");
module.exports = Employee;
