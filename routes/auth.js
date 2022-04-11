const express = require('express');
const { register, login, getMe } = require("../controllers/auth_controller");

const router = express.Router();
const { protect } = require('../middleware_utils/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/me', protect, getMe);

module.exports = router;