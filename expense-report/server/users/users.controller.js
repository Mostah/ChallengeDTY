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
        .then(count => res.send(count))
        .catch(err => next(err))
}

function updateUser(req, res) {
    userService.updateUser(req)
        .then(response => res.send('User succesfully updated'))
        .catch(err => next(err))
} 

function createUser(req, res) {
    userService.createUser(req)
        .then(response => res.send('User succesfully created'))
        .catch(err => next(err))
} 