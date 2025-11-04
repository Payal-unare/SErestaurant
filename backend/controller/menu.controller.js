const Menu = require('../models/menu.models');

// Add new dish
exports.addDish = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const dish = new Menu({ name, price, description, category, image });
    await dish.save();
    res.status(201).json({ message: 'Dish added successfully', dish });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all dishes
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Menu.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update dish
exports.updateDish = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;
    const dish = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description, image },
      { new: true }
    );
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ message: 'Dish updated successfully', dish });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete dish
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Menu.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ message: 'Dish deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
