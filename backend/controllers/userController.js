const db = require("../db/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { name, password } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    const result = await db
      .query(
        `INSERT INTO users 
            (name, password) 
            VALUES 
            ('${name}', '${hash}')`
      )
      .then(() => {
        res.status(200).json({ message: "User created." });
      })
      .catch((e) => {
        res.status(401).json({ message: "Name taken." });
      });
  });
}

async function login(req, res) {
  const { name, password } = req.body;
  const result = await db.query(
    `SELECT * FROM users
        WHERE name='${name}'
        LIMIT 1`
  );
  if (result.length != 0) {
    if (bcrypt.compareSync(password, result[0].password)) {
      const token = jwt.sign({ userId: result[0].iduser }, "hahaha", {
        expiresIn: "1h",
      });
      res.status(201).json({ token, userId: result[0].iduser });
    } else {
      res.status(401).json({ message: "Name or password is incorrect." });
    }
  } else {
    res.status(401).json({ message: "Name or password is incorrect." });
  }
}

module.exports = { register, login };
