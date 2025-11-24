// routes/order-route.js
const express = require("express");
const Order = require("../models/order");
const { authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management (JWT secured)
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/{orderNumber}:
 *   get:
 *     summary: Get a single order by OrderNumber
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({ OrderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authorize("admin"), async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      message: "Order added successfully",
      order: newOrder
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/{orderNumber}:
 *   put:
 *     summary: Replace an existing order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:orderNumber", authorize("admin"), async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { OrderNumber: req.params.orderNumber },
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order updated successfully",
      order: updatedOrder
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/{orderNumber}:
 *   patch:
 *     summary: Partially update an order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:orderNumber", authorize("admin"), async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { OrderNumber: req.params.orderNumber },
      { $set: req.body },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order updated (PATCH) successfully",
      order: updatedOrder
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/{orderNumber}:
 *   delete:
 *     summary: Delete an order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:orderNumber", authorize("admin"), async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      OrderNumber: req.params.orderNumber
    });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order deleted successfully",
      order: deletedOrder
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
