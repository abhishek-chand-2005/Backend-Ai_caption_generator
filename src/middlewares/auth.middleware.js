const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')


async function authMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"unauthorized user"
        })
    }

    try {
        console.log("Token received:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded payload:", decoded);
        const user = await userModel.findOne({_id: decoded.id});
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT error:", err.message);
        return res.status(401).json({
            message: 'Invalid token, please login again'
        });
    }

}

module.exports = authMiddleware;