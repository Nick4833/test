const db = require('../db/connect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const {name, password} = req.body;
    console.log(req.body)
    bcrypt.hash(password, 10, async function(err, hash) {
        const result = await db.query(
            `INSERT INTO users 
            (name, password) 
            VALUES 
            ('${name}', '${hash}')`
          );
    });
      res.status(201).json({ message: 'User registered successfully' });
}

async function login(req, res) {
    const {name, password} = req.body;
    console.log(req.body)
    const result = await db.query(
        `SELECT * FROM users
        WHERE name='${name}'
        LIMIT 1`
      );
      console.log(result)
      if(bcrypt.compareSync(password, result[0].password)) {
        const token = jwt.sign({ userId: result[0].iduser }, 'hahaha', {
            expiresIn: '1h',
            });
        res.status(201).json({ token });
      } else {
        res.status(401).json({message: 'Wrong password'})
      }
}


module.exports = { register, login }