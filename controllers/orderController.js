const Order = require('../models/Order');
const Menu = require('../models/Menu');

const createOrder = async (req, res) => {
  const { items } = req.body;
  
  if (!items || !items.length) {
    res.status(400);
    throw new Error('No items in order');
  }

  // Calculate total amount
  const totalAmount = await Promise.all(
    items.map(async (item) => {
      const menuItem = await Menu.findById(item.menuId);
      return menuItem.price * item.quantity;
    })
  ).then(prices => prices.reduce((a, b) => a + b, 0));

  const order = await Order.create({
    userId: req.user._id,
    items,
    totalAmount
  });

  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .populate('items.menuId');
  res.json(orders);
};

module.exports = { createOrder, getOrders };