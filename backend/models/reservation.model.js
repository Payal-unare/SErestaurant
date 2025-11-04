const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, lowercase: true, trim: true, match: [/.+@.+\..+/, 'Please enter a valid email'] },
  phone: { type: String, required: true, trim: true, minlength: 10 },
  date: { type: Date, required: true },
  time: { type: String, required: true, match: [/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'] },
  people: { type: Number, required: true, min: 1, max: 20 },
  specialRequests: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reservation', reservationSchema);
