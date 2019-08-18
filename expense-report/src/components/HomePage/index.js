import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
        };
    }

    render() {
        const { user } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.description.first_name}!</h1> 
                <p>You're logged in !!</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

export default HomePage;