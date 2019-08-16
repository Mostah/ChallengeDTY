// START THE SERVER WITH NODEMON FOR DEVELOPMENT
// nodemon index.js

const express = require('express'); 
const app = express();

var Report = require('./report');
var User = require('./user');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/expenseReportDB";

mongoose.connect(url, function(err) {
    if (err) throw err;
    console.log('Successfully connected to the data base');
});

var cors = require('cors')

app.use(cors(
    {origin: [
        "http://localhost:3000"
    ], credentials: true}
));

app.listen(8000, () => {
    console.log('Server started!');
});