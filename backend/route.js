const express = require('express');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const router = express.Router();


router.get("/", (req, res) => {
    res.json({ message: "ok" });
});

router.use('/user', userRouter);

router.use('/posts', postRouter);

module.exports = router;