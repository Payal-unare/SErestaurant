const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);
