const Menu = require('../models/Menu');

// ✅ Get all menu items
const getMenu = async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json({ message: "Menu items", data });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const menuItem = await Menu.create({ name, category, price });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update a menu item
const updateMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Menu item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
