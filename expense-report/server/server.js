// START THE SERVER WITH NODEMON FOR DEVELOPMENT
// nodemon index.js

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')

const basicAuth = require('./_helpers/basic_auth');
const errorHandler = require('./_helpers/error_handler');

var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/expenseReportDB";

mongoose.connect(url, function(err) {
    if (err) throw err;
    console.log('Successfully connected to the data base');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/api/users', require('./users/users.controller'));
app.use('/api/reports', require('./reports/reports.controller'));

// global error handler
app.use(errorHandler);

app.listen(8000, () => {
    console.log('Server started!');
});

//To be move in the right file
 