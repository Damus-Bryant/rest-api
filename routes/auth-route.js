// routes/auth-route.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and obtain a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login successful, token returned
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find employee in Atlas by Username
    const employee = await Employee.findOne({ Username: username });

    if (!employee || employee.Password !== password) {
      // AUTHENTICATION FAILURE (for screenshot)
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const payload = {
      empId: employee.Empid,
      username: employee.Username,
      role: employee.Role  // "admin" or "staff"
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // AUTHENTICATION SUCCESS
    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
