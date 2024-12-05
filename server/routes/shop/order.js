const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  confirmOrder,
} = require("../../controllers/shop/order");

const router = express.Router();

router.post("/create", createOrder);
router.post("/confirm", confirmOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
