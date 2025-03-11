const mongoose = require('mongoose');



const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URL)
        console.log('MongoDB connected successfully');


        
    } catch (error) {
        console.log('MongoDB connection failed!');
        process.exit(1)
        
    }
} 

module.exports = connectToDB;