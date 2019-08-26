import React, { Component } from 'react';
import './index.css';
import { userService } from '../../services/userService'
import { Link } from 'react-router-dom'

class UserWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        }
    }

    componentDidMount() {
        const { user } = this.state
        if (user.category === "employee" && user.manager !== "00000000000000000000000a")
            userService.getUserId(user.manager).then(manager => this.setState({ manager: manager }))
    }

    render() {
        const localUser = JSON.parse(localStorage.getItem('user'));
        const { user, manager } = this.state;
        return (
            <div className="UserWidget">
                <div className="container">
                    { localUser.category === "administrateur" ?
                    <button type="button" class="close" onClick={this.props.onDelete} value={user._id}>&times;</button>
                    : null
                    }
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={"/users/view/" + user._id}>
                        <div className="row border border-secondary rounded bg-light text-center">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                                <img className="dp rounded-circle" alt="profile" src="https://bootdey.com/img/Content/user_1.jpg" style={{ width: '120px', height: '120px' }} />
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-8" style={{ marginTop: "8px", marginBottom: "8px" }}>
                                <h4 className="media-heading">{user.description.first_name} {user.description.last_name}
                                    {user.description.adress ?
                                        <small> {user.description.adress.country} </small>
                                        : null
                                    }
                                </h4>
                                <a href={"mailto:" + user.description.email}><h6>{user.description.email}</h6></a>
                                <h6>{user.description.phone_number}</h6>
                                <hr style={{ margin: '8px auto' }} />
                                {user.category === "employee" && manager ?
                                    <span>Manager : {manager.description.first_name} {manager.description.last_name}</span>
                                    : null
                                }
                                {user.category === "employee" && !manager ?
                                    <span>Manager : TO BE DEFINED</span>
                                    : null
                                }

                            </div>
                        </div>
                        <br />
                        <br />
                    </Link>
                </div>

            </div>
        );
    }
}

export default UserWidget