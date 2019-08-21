import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { userService } from '../../services/userService'

import UserWidget from './userWidget'
import { Search } from '../_components'


class AllUsersPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: [ ],
            usersFiltered: [ ],
            searchEntry: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleChange(e) {
        const { users } = this.state
        const usersFiltered = users.filter(user => 
            user.description.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.description.last_name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        this.setState({ searchEntry: e.target.value, usersFiltered })
    }

    onDelete(e) {
        const { users, searchEntry } = this.state;
        const updatedUsers = users.filter( user => user._id !== e.target.value);
        const usersFiltered = updatedUsers.filter(user => 
            user.description.first_name.toLowerCase().includes(searchEntry.toLowerCase()) || user.description.last_name.toLowerCase().includes(searchEntry.toLowerCase())
        );
        this.setState({ users: updatedUsers, usersFiltered })
        userService.deleteUser(e.target.value)
    }

    componentDidMount() {
        userService.getAllUsers()
            .then(users => {
                this.setState({ users, usersFiltered: users })
            })
    }
    
    render() {
        const { usersFiltered, searchEntry } = this.state;
        const administrators = usersFiltered.filter( user => user.category === "administrateur" );
        const employees = usersFiltered.filter( user => user.category === "employee" );
        const managers = usersFiltered.filter( user => user.category === "manager" );
        return (
            <div className="AllUsersPage">
                
                <div className="createUserButton">
                    <Link to="/users/new">
                        <Button variant="info">Create Users</Button>
                    </Link>
                </div>
                <div className="Search">
                    <Search onChange={this.handleChange} value={searchEntry}/>
                </div>
                <div className="Users">
                    { administrators.length !== 0 ?
                        <div className="administrators">
                            <h3 className="display-4">Administrators :</h3>
                            {administrators.map( user => 
                                <div className="row" key={user._id}>
                                    <div className="col-sm-10">
                                        <UserWidget user={user} onDelete={this.onDelete}/>
                                    </div>
                                </div>
                            )}
                        </div>
                        : null 
                    }
                    { managers.length !== 0 ?
                        <div className="managers">
                            <h3 className="display-4">Managers :</h3>
                            {managers.map( user => 
                                <div className="row" key={user._id}>
                                    <div className="col-lg-10">
                                        <UserWidget user={user} onDelete={this.onDelete}/>
                                    </div>
                                </div>
                            )}
                        </div>
                        : null
                    }
                    { employees.length !== 0 ?
                        <div className="employees">
                            <h3 className="display-4">Employees :</h3>
                            {employees.map( user => 
                                <div className="row" key={user._id}>
                                    <div className="col-lg-10">
                                        <UserWidget user={user} onDelete={this.onDelete}/>
                                    </div>
                                </div>
                            )}
                        </div>
                        : null
                }    
                </div>
            </div>
        )
    }
}

export default AllUsersPage;