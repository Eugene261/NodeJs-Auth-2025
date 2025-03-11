const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware.js');
const adminMiddleware = require('../Middleware/adminMiddleware.js');
const uploadMiddleware = require('../Middleware/uploadMiddleware.js');
const {uploadImage, fetchImagesController, deleteImage} = require('../Controllers/imageController.js')



const router = express.Router();

// Upload the image
router.post(
    '/upload',
    authMiddleware,
    adminMiddleware,
    uploadMiddleware.single('image'),
    uploadImage
);




//  to get all the images
router.get('/get',authMiddleware, fetchImagesController);

// delete image route
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteImage)




module.exports = router;

