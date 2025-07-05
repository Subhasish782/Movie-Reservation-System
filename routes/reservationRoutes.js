const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { requireLogin } = require('../middlewares/authMiddleware');

// Show reservation form
router.get('/reserve/:id', requireLogin, reservationController.getReservationPage);

// Submit reservation form
router.post('/reserve/:id', requireLogin, reservationController.postReservation);

module.exports = router;
