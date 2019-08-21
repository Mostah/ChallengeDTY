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
        const { user, manager } = this.state;
        return (
            <div className="UserWidget">
                
                <div className="container">
                    <div className="float-right">
                        <div className="buttons">
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={"/users/view/"+user._id}>
                                <button type="button" class="btn btn-info" >See</button>
                            </Link>
                            <button type="button" class="btn btn-danger" onClick={this.props.onDelete} value={user._id}>X</button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="media">
                            <img className="pull-left media-object dp img-circle" alt="profile picture" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={{ width: '100px', height: '100px' }} />
                            <div className="media-body">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default UserWidget