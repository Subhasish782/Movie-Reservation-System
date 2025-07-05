const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { requireLogin } = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/adminMiddleware');

// Admin dashboard route
router.get('/admin/dashboard', requireLogin, requireAdmin, adminController.getDashboard);

// Delete reservation (admin-only)
router.post('/admin/reservation/delete/:id', requireLogin, requireAdmin, adminController.deleteReservation);

module.exports = router;
