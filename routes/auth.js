const express = require('express'); 
const router = express.Router(); 

const {login, register} = require('../controllers/auth');


// @route /api/v1/auth/register 
// @desc Register user 
// @access Public 
router.post('/register', register)


// @route /api/v1/auth/login
// @desc Login user 
// @access Public 
router.post('/login', login)

module.exports = router; 