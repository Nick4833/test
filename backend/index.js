const express = require("express");
require('dotenv').config();
const db = require('./db/connect');
const cors = require('cors');
const route = require('./route');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', route);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});