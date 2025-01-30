const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const router = express.Router();



router.route('/')
  .get(getMenu)
  .post(protect, createMenuItem);

router.route('/:id')
  .put(protect, updateMenuItem)
  .delete(protect, deleteMenuItem);

module.exports = router;
