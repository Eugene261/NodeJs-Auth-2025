const User = require('../Models/user.js'); // Capital "U" for the model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register controller
const register = async (req, res) => {
     try {
        // extract user information from the request body
        const {username, email, password, role} = req.body;

        // check if the user already exists in the database
        const checkExistingUser = await User.findOne({$or: [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists. Please register with different details'
            })
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a newUser and save in the database
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success: true,
                message: 'User registered successfully'
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'Unable to register user please try again.'
            })
        }

     } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
     }
}

// login controller
const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        // find if the user exists in the database
        const foundUser = await User.findOne({username}); // Use a different variable name

        if(!foundUser){
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            })
        }

        // check if password match
        const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid username or password'
            })
        }

        // create a token
        const token = jwt.sign({
            userId: foundUser._id,
            username: foundUser.username,
            role: foundUser.role
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        })

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        })

    } catch (error) {
       console.log(error);
       res.status(500).json({
           success: false, // Fixed typo: sucess -> success
           message: 'Something went wrong! Please try again'
       })
    }
};

const changePassword = async(req, res)=>{
    try {

        const userId = req.userInfo.userId;

        // extract old and new password

        const {oldPassword, newPassword} = req.body;

        //  find the current logged in user
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User not found!'
            })
        }

        // check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Old password is not correct! Please try again'
            })
        }

        // Hash the new password here
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        // update user password
        user.password = newHashedPassword;
        await user.save()

        return res.status(200).json({
            success : true,
            message : 'Password updated successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, // Fixed typo: sucess -> success
            message: 'Something went wrong! Please try again'
        }) 
    }
}

module.exports = {
    register,
    login,
    changePassword
}