const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller'); 
const { checkAuth } = require('../middleware/auth');

router.get('/', checkAuth, (req, res) => {
    res.send("user router")
})

router.post('/signUp' , userController.signUp);
router.post('/login' , userController.login);

module.exports = router;