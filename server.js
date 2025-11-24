// server.js
require("dotenv").config();

const express = require("express");
const swaggerDocs = require("./swagger");
const connectDB = require("./config/db");
const { corsHandler } = require("./middleware/cors");
const { authenticate, authorize } = require("./middleware/auth");

const authRoutes = require("./routes/auth-route");
const orderRoutes = require("./routes/order-route");
const productRoutes = require("./routes/product-route");
const employeeRoutes = require("./routes/employee-route");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectDB();

// Parse JSON bodies
app.use(express.json());

// Global CORS + pre-flight handler
app.use(corsHandler);

// Swagger UI
swaggerDocs(app);

// Routes
app.use("/auth", authRoutes);               // Login -> JWT

// Products are public (for third-party sites)
app.use("/products", productRoutes);

// Employees – admin only (for safety in a real app)
app.use("/employees", authenticate, authorize("admin"), employeeRoutes);

// All /orders endpoints require a valid token
app.use("/orders", authenticate, orderRoutes);

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "Gelos Grocery REST API is running." });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
