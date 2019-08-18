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
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.listen(8000, () => {
    console.log('Server started!');
});

//To be move in the right file

var Report = require('./structure/report');

app.route('/api/addReport').post((req, res) => {
    const new_report = new Report({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        date: new Date(),
        amount: req.body.amount,
        currency: req.body.currency,
        comment: req.body.comment,
        author: req.body.author,
        manager: req.body.manager,
        document: req.body.document,
    });
//NEED TO UPDATE THE AUTHOR AND MANAGER DATABASE TO ADD THE NEW REPORT
    new_report.save(function(err) {
        if (err) throw err;
        console.log('Report succesfully saved by user : ' + req.body.author)
    });
    
    res.send('Report succesfully saved');
});