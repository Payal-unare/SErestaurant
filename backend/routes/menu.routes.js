const express = require('express');
const router = express.Router();
const menuController = require('../controller/menu.controller');

// Add new dish
router.post('/add', menuController.addDish);

// Get all dishes
router.get('/', menuController.getMenu);

// Get single dish by ID
router.get('/:id', menuController.getDishById);

// Update dish by ID
router.put('/:id', menuController.updateDish);

// Delete dish by ID
router.delete('/:id', menuController.deleteDish);

module.exports = router;
