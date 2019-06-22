const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const db = require('../database/index');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// Create APIs HERE

app.listen(port, () => {
  console.log(`Good news, server is connected on port ${port}`);
});