const express = require('express');
const {
    register,
    login,
    changePassword
} = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();


//  all routes are related to authentication & authorization
router.post('/register', register);
router.post('/login', login);
router.post('/change-password', authMiddleware, changePassword)






module.exports = router;