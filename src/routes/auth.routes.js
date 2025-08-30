/* Routes kon-konse hain */

const express = require('express');
const userModel = require('../models/user.model')
const {registerController, loginController} = require('../controllers/auth.controller')
const jwt = require('jsonwebtoken')


const router = express.Router()


router.post('api/register', registerController);
router.post('api/login', loginController )



router.get('api/user', (req, res) => {
  res.send("User route");
});

module.exports = router