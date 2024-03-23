const express = require('express');
const userController = require('../controllers/userController')
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json('ahh')
})

userRouter.post('/register', async function(req, res) {
    res.json(await userController.register(req, res));
    console.log('created');
})

userRouter.post('/login', async function(req, res) {
    console.log('here')
    await userController.login(req, res);
    console.log('logged in');
})

module.exports = userRouter