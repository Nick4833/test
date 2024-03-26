const express = require('express');
const userController = require('../controllers/userController')
const userRouter = express.Router();

userRouter.post('/register', async function(req, res) {
    await userController.register(req, res);
})

userRouter.post('/login', async function(req, res) {
    await userController.login(req, res);
})

module.exports = userRouter