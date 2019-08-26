var User = require('../structure/user');
var mongoose = require('mongoose');

module.exports = {
    authenticate,
    getCategory,
    getUserId,
    getUserPseudo,
    getAllUsers,
    deleteUser,
    updateUser,
    createUser
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

async function createUser(req) {
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

    await new_user.save(function(err) {
        if (err) throw err;
        console.log('User succesfully saved');
    });
    return 'ok'
}

async function updateUser(req) {
    await User.findOne({_id: req.body._id}).then(user => {
        user.pseudo = req.body.pseudo;
        user.password = req.body.password;
        user.category = req.body.category;
        user.description.first_name = req.body.description.first_name;
        user.description.last_name = req.body.description.last_name;
        if(req.body.description.birth_date) { user.description.birth_date = new Date(req.body.description.birth_date); }
        user.description.phone_number = req.body.description.phone_number;
        user.description.email = req.body.description.email;
        user.description.adress.number = req.body.description.number;
        user.description.adress.street = req.body.description.adress.street;
        user.description.adress.country = req.body.description.adress.country;
        user.description.adress.zip_code = req.body.description.adress.zip_code;
        user.description.profile_picture = req.body.description.profile_picture;
        user.manager = req.body.manager,
        user.reports = req.body.reports;
        
        user.save(function(err) {
            if (err) throw err 
            console.log('User succesfully changed')
        });
        return 'ok'
    });

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