const express = require('express');
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/jwtVerify');
const postRouter = express.Router();

postRouter.get('/', (req, res) => postController.allPosts(req, res))

postRouter.get('/total', (req, res) => postController.totalCount(req, res))

postRouter.delete('/', verifyToken, (req, res) => postController.deletePostById(req, res))

postRouter.put('/update', verifyToken, (req, res) => postController.updatePostById(req, res))

postRouter.get('/:postId', (req, res) => postController.findPostById(req, res))

postRouter.post('/create', verifyToken, async function(req, res) {
    res.json(await postController.createPost(req, res));
})

module.exports = postRouter