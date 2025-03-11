require('dotenv').config();
const express = require('express');
const connectToDB = require('./Database/db.js');
const authRoutes = require('./Routes/authRoutes.js');
const homeRoutes = require('./Routes/homeRoutes.js');
const adminRoutes = require('./Routes/adminRoutes.js');
const uploadImageRoutes = require('./Routes/imageRouts.js');



// connecting to Database
connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(express.json());

// Main routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});


module.exports = app;