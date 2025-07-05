const express = require('express');
const router = express.Router(); 
const reservationController = require('../controllers/reservationController');
const { requireLogin } = require('../middlewares/authMiddleware');


router.get('/my-bookings',reservationController.getUserBookings);
router.delete('/cancel-booking/:id', requireLogin, reservationController.cancelBooking);


module.exports = router;
