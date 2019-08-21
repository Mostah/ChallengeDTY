var User = require('../structure/user');
var mongoose = require('mongoose');

module.exports = {
    authenticate,
    getCategory,
    getUserId,
    getUserPseudo,
    getAllUsers,
    deleteUser,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ pseudo: username });
    if (user && password === user.password) {
        return user
    }
}

async function getCategory({ category }) {
    const list_category = await User.find({category: category});
    return list_category
}

async function getUserId({ _id }) {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(_id)});
    return user
}

async function getUserPseudo({ pseudo }) {
    const user = await User.find({ pseudo: pseudo }); //do not change to .findOne
    return user
}

async function getAllUsers() {
    const users = await User.find({});
    return users
}



async function deleteUser({ _id }) {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(_id)});
    if (user.category == "employee" && user.manager) { //delete employee in manager's database
        const manager = await User.findOne({_id: user.manager});
        if (manager) {
            manager.team = manager.team.filter( id => id != _id);
            manager.save(function(err) {
                if (err) throw err 
            });
        }
    }
    if (user.category == "manager" && user.team) { //delete manager in employee's database
        user.team.forEach( async function(_id) {
            const employee = await User.findOne({_id: _id})
            if (employee) {
                employee.manager = mongoose.Types.ObjectId('00000000000000000000000a');
                employee.save(function(err) {
                    if (err) throw err 
                });
            }
        })
    }
    const response =  await User.deleteOne({_id: _id});
    return response.deletedCount
}