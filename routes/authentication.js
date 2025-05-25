const express = require('express');
const Login = require('../controllers/auth/loginUser');
const Register = require('../controllers/auth/registerUser');
const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);

module.exports = router;
