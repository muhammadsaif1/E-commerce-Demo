const express = require("express");

const { searchProducts } = require("../../controllers/shop/search");

const router = express.Router();

router.get("/:keyword", searchProducts);

module.exports = router;
