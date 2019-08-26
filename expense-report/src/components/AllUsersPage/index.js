import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { userService } from '../../services/userService'

import UserWidget from './userWidget'
import { Search } from '../_components'


class AllUsersPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersFiltered: [],
            searchEntry: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.delete = this.delete.bind(this);
    }

    handleChange(e) {
        const { users } = this.state
        const usersFiltered = users.filter(user =>
            user.description.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.description.last_name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        this.setState({ searchEntry: e.target.value, usersFiltered })
    }

    delete(_id) {
        const { users, searchEntry } = this.state;
        console.log(_id);
        const updatedUsers = users.filter(user => user._id !== _id);
        const usersFiltered = updatedUsers.filter(user =>
            user.description.first_name.toLowerCase().includes(searchEntry.toLowerCase()) || user.description.last_name.toLowerCase().includes(searchEntry.toLowerCase())
        );
        this.setState({ users: updatedUsers, usersFiltered })
        userService.deleteUser(_id)
    }

    onDelete(e) {
        const _id = e.target.value;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this ? This action is irreversible',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.delete(_id)
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
        });
    }

    componentDidMount() {
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser.category === "manager") {
            const users = []
            localUser.team.map(userId => 
                userService.getUserId(userId)
                    .then(user => {users.push(user); this.setState({ users: users, usersFiltered: users })
                })
            )
            console.log(users);
        }
            
        else {
            userService.getAllUsers()
                .then(users => {
                    this.setState({ users, usersFiltered: users })
                })
        }
    }

    render() {
        const localUser = JSON.parse(localStorage.getItem('user'));
        const { usersFiltered, searchEntry } = this.state;
        const administrators = usersFiltered.filter(user => user.category === "administrateur");
        const employees = usersFiltered.filter(user => user.category === "employee");
        const managers = usersFiltered.filter(user => user.category === "manager");
        return (
            <div className="AllUsersPage">
                <div className="row justify-content-md-center">
                    <h2 className="display-4">All Users</h2>
                </div>
                <br/>
                <div className="row justify-content-md-center">
                    <div className="col-12">
                        <div className="Search">
                            <Search onChange={this.handleChange} value={searchEntry} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="Users">
                    {administrators.length !== 0 && localUser.category !== "manager" ? 
                        <div className="administrators">
                            <h1 className="display-5">Administrators :</h1>
                            <br />
                            <div className="row">
                                {administrators.map(user =>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" key={user._id}>
                                        <UserWidget user={user} onDelete={this.onDelete} />
                                    </div>
                                )}
                            </div>
                        </div>
                        : null
                    }
                   
                    {managers.length !== 0 && localUser.category !== "manager" ?
                        <div className="managers">
                             <hr />
                            <h1 className="display-5">Managers :</h1>
                            <br />
                            <div className="row">
                                {managers.map(user =>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" key={user._id}>
                                        <UserWidget user={user} onDelete={this.onDelete} />
                                    </div>
                                )}
                            </div>
                        </div>
                        : null
                    }
                    
                    {employees.length !== 0 ?
                        <div className="employees">
                            <hr />
                            <h1 className="display-5">Employees :</h1>
                            <br />
                            <div className="row">
                                {employees.map(user =>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" key={user._id}>
                                        <UserWidget user={user} onDelete={this.onDelete} />
                                    </div>
                                )}
                            </div>
                        </div>
                        : null
                    }
                </div>
                <hr />
            </div>
        )
    }
}

export default AllUsersPage;