const Reservation = require('../models/reservation.model');

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    console.error('Reservation save error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
