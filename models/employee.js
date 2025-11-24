// models/employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  Empid:   { type: Number, required: true, unique: true },
  Username:{ type: String, required: true, unique: true },
  Password:{ type: String, required: true },
  Role:    { type: String, required: true, enum: ["admin", "staff"] }
}, { collection: "employees" });

module.exports = mongoose.model("Employee", employeeSchema);
