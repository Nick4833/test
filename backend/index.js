const express = require("express");
const db = require('./db/connect');
const route = require('./route');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', route);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});