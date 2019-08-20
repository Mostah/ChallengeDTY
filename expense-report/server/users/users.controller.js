const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

const userService = require('./user.service');
var User = require('../structure/user');

// routes
router.post('/authenticate', authenticate);
router.post('/createUser', createUser);
router.post('/getCategory', getCategory);
router.post('/getUserId', getUserId);
router.post('/getUserPseudo', getUserPseudo);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getCategory(req, res, next) {
    userService.getCategory(req.body)
        .then(list => res.json(list))
        .catch(err => next(err))
}

function getUserId(req, res, next){
    userService.getUserId(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'User not found' }))
        .catch(err => next(err))
}

function getUserPseudo(req, res, next) {
    userService.getUserPseudo(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'User not found' }))
        .catch(err => next(err))
}

function createUser(req, res) {
    newId = new mongoose.Types.ObjectId()
    if(req.body.manager) {
        var managerID = mongoose.Types.ObjectId(req.body.manager);
        User.findOne({_id: managerID}).then( //add the employee in the manager's team
            user => {
                user.team.push(newId);
                user.save(function(err) {
                    if (err) throw err 
                });
            });
    }
    
    const new_user = new User({
        _id: newId,
        pseudo: req.body.pseudo,
        password: req.body.password,
        category: req.body.category,
        description: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            phone_number: req.body.phone_number,
            email: req.body.email,
            adress: {
                number: req.body.number,
                street: req.body.street,
                country: req.body.country,
                zip_code: req.body.zip_code,
            },
            profile_picture: req.body.profile_picture
        },
        manager: managerID,
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