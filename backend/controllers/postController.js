const db = require('../db/connect');

async function createPost(req, res) {
    const {title, content, userId} = req.body;
    const result = await db.query(
        `INSERT INTO posts 
        (title, content, user_id) 
        VALUES 
        ('${title}', '${content}', '${userId}')`
      ).then(() => {
        res.status(200).json({ message: "Post created." });
      })
      .catch((e) => {
        res.status(401).json({ message: "User does not exist." });
      });
}

async function totalCount(req, res) {
    const result = await db.query(`SELECT COUNT(idpost) AS total FROM test.posts;`);
    res.status(201).send({total: result[0].total})
}

async function allPosts(req, res) {
    const page = req.query.page;
    const offset = page * 10;
    const result = await db.query(`SELECT * FROM posts LIMIT 10 OFFSET ${offset}`);
    res.status(201).json({posts: result});
}

async function findPostById(req, res) {
    const postId = req.params.postId
    const result = await db.query(`SELECT * FROM posts
    WHERE idpost = '${postId}'`);
    res.status(201).json({posts: result});
}

async function deletePostById(req, res) {
    const {postId, userId} = req.body
    const result = await db.query(`DELETE FROM posts
    WHERE idpost = '${postId}' AND user_id = '${userId}'`);
    res.status(201).json({posts: result});
}

async function updatePostById(req, res) {
    const {title, content, userId, postId} = req.body
    const result = await db.query(`UPDATE posts
    SET title = '${title}', content = '${content}'
    WHERE idpost = '${postId}' AND user_id = '${userId}'`);
    res.status(201).json({posts: result});
}

module.exports = { createPost, totalCount, allPosts, findPostById, deletePostById, updatePostById }