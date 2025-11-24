const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  OrderNumber: Number,
  OrderDate: String,
  CustomerNumber: Number,
  ProductCode: Number,
  ProductName: String,
  ProductQuantity: Number,
  ProductPrice: Number,
  TotalAmount: Number,
  ModeOfPayment: String
});

module.exports = mongoose.model("Order", orderSchema);
