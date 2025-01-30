const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

module.exports = router;