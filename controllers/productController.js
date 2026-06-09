const Product = require("../models/productModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Cannot fetch products",
      error: error.message
    });
  }
};

// Search products by name or brand
const searchProducts = async (req, res) => {
  try {
    const searchString = req.params.search;
    
    // We search using regex (case-insensitive) on name and brand for partial matches.
    // Alternatively, you can use MongoDB full-text search: const query = { $text: { $search: searchString } };
    const query = {
      $or: [
        { name: { $regex: searchString, $options: "i" } },
        { brand: { $regex: searchString, $options: "i" } }
      ]
    };

    const products = await Product.find(query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Cannot search products",
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  searchProducts
};

