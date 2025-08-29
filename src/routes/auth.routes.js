const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwevtoken')

const router = express.Router()


router.post('/register', async (req, res)=>{
    const {username,password} = req.body;

    const userExists = await userModel.findOne({
        username})

        if(userExists){
            return res.status(409).json({
                message:'user already exists'
            })
        }

    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.status(201).json({
        message:'user registered successfully',
        user,
        token
    })
});

router.post('/login', async(req,res)=>{
    const {username, password} = req.body;

    const isUserExists = await userModel.findOne({
        username:username
    })
    if(!isUserExists){
        return res.status(401).json({
            message:'user not found'
        })
    }
    const isPasswordValid = password == isUserExists.password;
    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    res.status(200).json({
        message: "user loggedIn"
    })
})


router.get('/user', async (req, res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({_id:decoded.id}).select('-password -__v');
        
        res.cookie("token", token)
        res.status(200).json({
            message:"user data fetched seccessfully"
        })
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
})

module.exports = router