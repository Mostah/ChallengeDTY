import React, { Component } from 'react';
import './index.css';

import { userService } from '../../services/userService'

class CreateUserPage extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
        this.state = {
            pseudo: '',
            pseudoValid: true,
            password: '',
            passwordValid: true,
            first_name: '',
            last_name: '',
            email: '',
            emailValid: true,
            category: '',
            manager: '',
            submitted: false,
            loading: false,
            created: false,
            error: '',
            manager_list: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
        this.reset = this.reset.bind(this);
    } 

    componentDidMount() {
        userService.getCategory('manager').then(list => this.setState({ manager_list: list}));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState( {[name]: value} );

        //TODO Avoid sending requests at every change, just one if the user stop typing for 1 sec
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (name == 'pseudo') {
                userService.getUserPseudo(value)
                    .then(user => user.length == 0 ? this.setState({ pseudoValid: true }) : this.setState({pseudoValid: false}))
            }
        }, 700);
        this.validateField(name, value)

    }

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
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

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true});
        const { pseudo, pseudoValid, password, passwordValid, first_name, last_name, email, emailValid, category, manager} = this.state //to complete

        // stop here if form is invalid
        if (!(pseudo && password && first_name && last_name && email && category && pseudoValid && emailValid && passwordValid)) { //to complete
            return;
        }       
        this.setState({ loading: true})
        userService.createUser(pseudo, password, first_name, last_name, email, category, manager)
            .then(text => {
                if(text === "OK") { 
                    this.setState({ created: true });
                    this.reset();
                }
                else{
                    this.setState({error: text, loading: false})
                }
            });
    }

    reset() {
        userService.getCategory('manager').then(list => this.setState({ manager_list: list}));
        this.setState({
            pseudo: '',
            pseudoValid: true,
            password: '',
            passwordValid :true,
            first_name: '',
            last_name: '',
            email: '',
            emailValid: true,
            category: '',
            manager: '',
            submitted: false,
            loading: false,
            created: true,
            error: '',
        })
    }

    render() {
        const { pseudo, pseudoValid, password, passwordValid, first_name, last_name, email, emailValid, category, manager, submitted, loading, created, error, manager_list } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className='CreateUserPage'>
                    <h2>Create User</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !pseudo ? ' has-error' : '')}>
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" name="pseudo" placeholder="JBridoux" value={pseudo} onChange={this.handleChange} />
                            {submitted && !pseudo &&
                                <small className="text-danger">Pseudo is required</small>
                            }
                            {submitted && pseudo && !pseudoValid &&
                                <small className="text-danger">Pseudo already taken </small>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="**********" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <small className="text-danger">Password is required</small>
                            }
                            {submitted && password && !passwordValid &&
                                <small className="text-danger">Invalid password : it length must be > 6</small>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !first_name ? ' has-error' : '')}>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name="first_name"  placeholder="Justin" value={first_name} onChange={this.handleChange} />
                            {submitted && !first_name &&
                                <small className="text-danger">First Name is required</small>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !last_name ? ' has-error' : '')}>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" placeholder="Bridoux" value={last_name} onChange={this.handleChange} />
                            {submitted && !last_name &&
                                <small className="text-danger">Last Name is required</small>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email">e-mail</label>
                            <input type="text" className="form-control" name="email" placeholder="justin.bridoux@email.com" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <small className="text-danger">e-mail is required</small>
                            }
                            {submitted && email && !emailValid &&
                                <small className="text-danger">Invalid email</small>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !category ? ' has-error' : '')}>
                            <label htmlFor="category">Category</label>
                            <select className="form-control" name="category" value={category} onChange={this.handleChange}>
                                <option value="none">- - - - - - -</option>
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                                <option value="administrateur">Administrateur</option>
                            </select>
                            {submitted && !category && category != "none" &&
                                <small className="text-danger">Category is required</small>
                            }
                        </div>
                        { category === 'employee' ? 
                            <div className={'form-group' + (submitted && !manager ? 'has-error' : '')}>
                                <label htmlFor="manager">Manager</label>
                                <select className="form-control" name="manager" value={manager} onChange={this.handleChange}>
                                    <option value="none">- - - - - - -</option>
                                    {manager_list.map( item => <option key={item._id} value={item._id}>{item.description.first_name} {item.description.last_name}</option>)}
                                </select>
                                {submitted && !manager && manager != "none" &&
                                    <small className="text-danger">Manager is required</small>
                            }
                            </div>
                            : null
                        }
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Create</button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt='loading'/>
                            }
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>Message from server : {error}</div>
                        }
                        {created && !error && 
                            <div className={'alert alert-success'}>User Succesfully Created</div>
                        }
                    </form>
                </div>
            </div>
        );
    }

}

export default CreateUserPage