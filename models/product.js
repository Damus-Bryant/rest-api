const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ProductCode: Number,
  ProductName: String,
  ProductQuantity: Number,
  Product_price: Number
});

module.exports = mongoose.model("Product", productSchema);
