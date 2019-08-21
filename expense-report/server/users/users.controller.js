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
router.post('/deleteUser', deleteUser);
router.post('/updateUser', updateUser);

router.get('/getAll', getAllUsers)


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

function getAllUsers(req , res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
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

function deleteUser(req, res) {
    userService.deleteUser(req.body)
        .then(count => count)
}

function updateUser(req, res) {
    user = User.findOne({_id: req.body._id}).then(user => {
        user.pseudo = req.body.pseudo;
        user.password = req.body.password;
        user.category = req.body.category;
        user.description.first_name = req.body.description.first_name;
        user.description.last_name = req.body.description.last_name;
        user.description.birth_date = new Date(req.body.description.birth_date);
        user.description.phone_number = req.body.description.phone_number;
        user.description.email = req.body.description.email;
        user.description.adress.number = req.body.description.number;
        user.description.adress.street = req.body.description.adress.street;
        user.description.adress.country = req.body.description.adress.country;
        user.description.adress.zip_code = req.body.description.adress.zip_code;
        user.description.profile_picture = req.body.description.profile_picture;
        //user.manager = managerID,
        //user.team: req.body.team,
        console.log(user.description);
        user.reports = req.body.reports;
        user.save(function(err) {
            if (err) throw err 
            console.log('User succesfully changed')
        });
        res.send('User succesfully changed')
    });
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