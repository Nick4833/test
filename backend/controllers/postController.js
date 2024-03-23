const db = require('../db/connect');

async function createPost(req, res) {
    const {title, description, userId} = req.body;
    const result = await db.query(
        `INSERT INTO posts 
        (title, description, userId) 
        VALUES 
        ('${title}', '${description}', '${userId}')`
      );
      res.status(201).json({ message: 'Post created successfully' });
}

async function allPosts(req, res) {
    const result = await db.query(`SELECT * FROM posts`);
    res.status(201).json({posts: result});
}

async function findPostById(req, res) {
    const postId = req.params.postId
    console.log(postId)
    const result = await db.query(`SELECT * FROM posts
    WHERE idpost = '${postId}'`);
    res.status(201).json({posts: result});
}

async function deletePostById(req, res) {
    const {postId, userId} = req.body
    console.log(postId)
    const result = await db.query(`DELETE FROM posts
    WHERE idpost = '${postId}' AND userId = '${userId}'`);
    res.status(201).json({posts: result});
}

async function updatePostById(req, res) {
    const {title, description, userId, postId} = req.body
    console.log(postId)
    const result = await db.query(`UPDATE posts
    SET title = '${title}', description = '${description}'
    WHERE idpost = '${postId}' AND userId = '${userId}'`);
    res.status(201).json({posts: result});
}

module.exports = { createPost, allPosts, findPostById, deletePostById, updatePostById }