const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservation.controller');

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getReservations);

module.exports = router;
