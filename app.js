const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const comparisons = require('./controllers/comparisons');

mongoose.connect(process.env.MONGO_URL);

app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(__dirname + '/public'));
app.use('/comparisons', comparisons);

app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});