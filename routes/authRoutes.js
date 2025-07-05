const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const { requireLogin } = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/adminMiddleware');


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.logout);


router.get('/admin/dashboard', requireLogin, requireAdmin, adminController.getDashboard);

module.exports = router;
