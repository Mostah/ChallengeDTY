const express = require('express');
const router = express.Router();
const userService = require('./user.service');
var User = require('../structure/user');

// routes
router.post('/authenticate', authenticate);
router.post('/createUser', createUser)

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function createUser(req, res) {
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
}