import React, { Component } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userService } from '../../services/userService'
import { Link } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

class ViewUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPseudo: '',
            emailValid: true,
            passwordValid: true,
            pseudoValid: true,
            loading: false,
            saved: false,
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { user, oldPseudo } = this.state;
        if (name === "first_name" || name === "last_name" || name === "email" || name === "phone_number" || name === "birth_date") { user.description[name] = value }
        if (name === "number" || name === "street" || name === "country" || name === "zip_code") { user.description.adress[name] = value }
        else { user[name] = value }
        this.setState({ user });

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (name === 'pseudo') {
                userService.getUserPseudo(value)
                    .then(item => item.length === 0 || item.pseudo === oldPseudo ? this.setState({ pseudoValid: true }) : this.setState({ pseudoValid: false }))
            }
        }, 700);
        this.validateField(name, value)

    }

    handleSubmit(e) {
        e.preventDefault();

        const { user, emailValid, passwordValid, pseudoValid } = this.state

        // stop here if form is invalid
        if (!(user.pseudo && user.password && user.description.first_name && user.description.last_name && user.description.email && user.category !== "none" && pseudoValid && emailValid && passwordValid)) {
            return;
        }
        
        this.setState({ loading: true})
        userService.updateUser(user)
            .then(text => {
                if(text === "OK") {
                    this.setState({ saved: true });
                    //update localStorage
                }
                else{
                    this.setState({error: text, loading: false})
                }
            });
    }

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i) != null;
                break;
            case 'password':
                passwordValid = value.length >= 6;
                break;
            default:
                break;
        }
        this.setState({ emailValid, passwordValid })
    }

    componentDidMount() {
        userService.getUserId(this.props.match.params._id).then(user => {
            user.description.birth_date = user.description.birth_date.slice(0,10);
            const oldPseudo = user.pseudo;
            const descriptionWithAdress = { ...user.description, adress: {}}
            const newUser = { ...user, description: descriptionWithAdress }
            user.description.adress
                ? this.setState({ user: user, oldPseudo })
                : this.setState({ user: newUser, oldPseudo })
        });
    }

    render() {
        const { user, emailValid, passwordValid, pseudoValid, error, saved } = this.state;
        return (
            <div className="ViewUserPage">
                {user ?
                    <div className="container bootstrap snippet">
                        <div className="row">
                            <div>
                                <h1>
                                    {user.description.first_name} {user.description.last_name}
                                    <span className="text-muted">   -- {user.category}</span>
                                </h1>

                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-3">
                                <div className="text-center">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />
                                    <h6>Upload a different photo...</h6>
                                    <input onChange={this.handleChange} type="file" className="text-center center-block file-upload" />
                                </div>
                                <ul className="list-group">
                                    <li className="list-group-item text-muted">Reports <FontAwesomeIcon icon={faChartLine} /></li>
                                    <li className="list-group-item text-right"><span className="pull-left"><strong>Validated</strong></span> 125</li>
                                    <li className="list-group-item text-right"><span className="pull-left"><strong>Pending</strong></span> 13</li>
                                    <li className="list-group-item text-right"><span className="pull-left"><strong>Refused</strong></span> 3</li>
                                </ul>
                            </div>
                            <div className="col-9">
                                <div className="user-content">
                                    <form className="form" action="##" method="post" id="registrationForm">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="first_name"><h4>First name</h4></label>
                                                    <input onChange={this.handleChange} type="text" name="first_name" className="form-control" value={user.description.first_name} placeholder="first name" />
                                                    {!user.description.first_name &&
                                                        <small className="text-danger">First Name is required</small>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="last_name"><h4>Last name</h4></label>
                                                    <input onChange={this.handleChange} type="text" name="last_name" className="form-control" value={user.description.last_name} placeholder="last name" />
                                                    {!user.description.last_name &&
                                                        <small className="text-danger">Last Name is required</small>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="email"><h4>Email</h4></label>
                                                    <input onChange={this.handleChange} type="email" name="email" className="form-control" value={user.description.email} placeholder="you@email.com" />
                                                    {!user.description.email &&
                                                        <small className="text-danger">e-mail is required</small>
                                                    }
                                                    {user.description.email && !emailValid &&
                                                        <small className="text-danger">Invalid email</small>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="phone_number"><h4>Phone number</h4></label>
                                                    <input onChange={this.handleChange} type="text" name="phone_number" className="form-control" value={user.description.phone_number} placeholder="phone number" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="category"><h4>Category</h4></label>
                                                    <select className="form-control" name="category" value={user.category} onChange={this.handleChange}>
                                                        <option value="none">- - - - - - -</option>
                                                        <option value="employee">Employee</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="administrateur">Administrateur</option>
                                                    </select>
                                                    {user.category && user.category == "none" &&
                                                        <small className="text-danger">Category is required</small>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="birth_date"><h4>Birth date</h4></label>
                                                    <input onChange={this.handleChange} type="date" name="birth_date" className="form-control" value={user.description.birth_date} placeholder="Birth date" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="pseudo"><h4>Pseudo</h4></label>
                                                    <input onChange={this.handleChange} type="text" name="pseudo" className="form-control" value={user.pseudo} placeholder="enter pseudo" />
                                                    {!user.pseudo &&
                                                        <small className="text-danger">Pseudo is required</small>
                                                    }
                                                    {user.pseudo && !pseudoValid &&
                                                        <small className="text-danger">Pseudo already taken </small>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="password"><h4>Change password</h4></label>
                                                    <input onChange={this.handleChange} type="password" name="password" className="form-control" value={user.password} placeholder="enter new password" />
                                                    {!user.password &&
                                                        <small className="text-danger">Password is required</small>
                                                    }
                                                    {user.password && !passwordValid &&
                                                        <small className="text-danger">Invalid password : it length must be > 6</small>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <h4>Address :</h4>
                                        <hr />
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="form-group">
                                                    <label for="number"><h5>Street Number</h5></label>
                                                    <input onChange={this.handleChange} type="number" name="number" className="form-control" value={user.description.adress.number} placeholder="street number" />
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div className="form-group">
                                                    <label for="street"><h5>Street</h5></label>
                                                    <input onChange={this.handleChange} type="text" name="street" className="form-control" value={user.description.adress.street} placeholder="street" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="zip_code"><h5>Zip code</h5></label>
                                                    <input onChange={this.handleChange} type="number" name="zip_code" className="form-control" value={user.description.adress.zip_code} placeholder="zip code" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="country"><h5>Country</h5></label>
                                                    <input onChange={this.handleChange} type="text" name="country" className="form-control" value={user.description.adress.country} placeholder="country" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group">
                                            <div className="col-xs-12">
                                                <button className="btn btn-lg btn-success" onClick={this.handleSubmit}>Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {error &&
                            <div className={'alert alert-danger'}>Message from server : {error}</div>
                        }
                        {saved && !error && 
                            <div className={'alert alert-success'}>User Succesfully Saved</div>
                        }
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}


export default ViewUserPage;