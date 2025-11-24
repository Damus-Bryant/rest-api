// routes/product-route.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/{code}:
 *   get:
 *     summary: Get product by ProductCode
 *     tags: [Products]
 */
router.get("/:code", async (req, res) => {
  try {
    const product = await Product.findOne({ ProductCode: req.params.code });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 */
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
