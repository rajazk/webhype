const express = require("express");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Products");
const router = express.Router();


getProducts = asyncHandler(async (req, res) => {
  const rgx = new RegExp(`^${req.query.brand}`);
  const complete= req.query
  const allProducts = await Product.find(complete);
  return res.status(200).json({ success: 1, data: allProducts });
});



router.get("/brands", getProducts);

module.exports = router;
