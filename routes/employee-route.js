// routes/employee-route.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management (admin only)
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 */
router.get("/", async (req, res) => {
  try {
    const data = await Employee.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee by Empid
 *     tags: [Employees]
 */
router.get("/:id", async (req, res) => {
  try {
    const emp = await Employee.findOne({ Empid: req.params.id });

    if (!emp) return res.status(404).json({ message: "Employee not found" });

    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
