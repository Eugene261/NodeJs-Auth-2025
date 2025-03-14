const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(404).json({
            success : false,
            message : 'Access denied. No token provided. Please login to continue'
        })
    }

    // decode token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken);

        req.userInfo = decodedToken;

        next();
        


    } catch (error) {
        console.log();
        return res.status(500).json({
            success : false,
            message : 'Access denied. No token provided. Please login to continue'
        })
    }
    
    
};

module.exports = authMiddleware;