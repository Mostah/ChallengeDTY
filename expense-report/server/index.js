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

app.route('/api/createUser').post((req, res) => {
    const new_user = new User({
        _id: new mongoose.Types.ObjectId(),
        pseudo: req.body.pseudo,
        password: req.body.password,
        category: req.body.category,
        description: {
            first_name: req.body.description.first_name,
            last_name: req.body.description.last_name,
            birth_date: req.body.description.birth_date,
            phone_number: req.body.description.phone_number,
            email: req.body.description.email,
            adress: {
                number: req.body.description.adress.number,
                street: req.body.description.adress.street,
                country: req.body.description.adress.country,
                zip_code: req.body.description.adress.zip_code,
            },
            profile_picture: req.body.description.profile_picture
        },
        manager: req.body.manager,
        team: req.body.team,
        reports: req.body.reports,
        date: new Date()
    });

    new_user.save(function(err) {
        if (err) throw err;
        console.log('User succesfully saved');
    });

    res.send('User succesfully saved');
});

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