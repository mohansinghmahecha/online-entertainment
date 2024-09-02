const express = require('express');
const { registerUser, authUser ,logoutUser} = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);  // Add this line

module.exports = router;
