const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();
const adminMiddleware = require('../Middleware/adminMiddleware.js');



router.get('/welcome', authMiddleware, adminMiddleware, (req, res)=>{
    res.json({
        message : 'welcome to the admin page'
    })
});


module.exports = router;
