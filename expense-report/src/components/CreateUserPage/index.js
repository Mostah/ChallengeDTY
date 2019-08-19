import React, { Component } from 'react';
import './index.css';

import { userService } from '../../services/userService'

class CreateUserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
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
        this.reset = this.reset.bind(this);
    } 

    componentDidMount() {
        userService.getCategory('manager').then(list => this.setState({ manager_list: list}));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState( {[name]: value} );
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true});
        const { pseudo, password, first_name, last_name, email, category, manager} = this.state //to complete

        // stop here if form is invalid
        if (!(pseudo && password && first_name && last_name && email && category)) { //to complete
            return;
        }       
        this.setState({ loading: true})
        userService.createUser(pseudo, password, first_name, last_name, email, category, manager)
            .then(value => { 
                this.setState({ created: value });
                this.reset();
                }, 
                error => this.setState({ error, loading: false})
            );
            
    }

    reset() {
        userService.getCategory('manager').then(list => this.setState({ manager_list: list}));
        this.setState({
            pseudo: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            category: '',
            manager: '',
            submitted: false,
            loading: false,
            created: true,
            error: '',
        })
    }

    render() {
        const { pseudo, password, first_name, last_name, email, category, manager, submitted, loading, created, error, manager_list } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className='CreateUserPage'>
                    <h2>Create User</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !pseudo ? ' has-error' : '')}>
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" className="form-control" name="pseudo" value={pseudo} onChange={this.handleChange} />
                            {submitted && !pseudo &&
                                <div className="help-block">Pseudo is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !first_name ? ' has-error' : '')}>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name="first_name" value={first_name} onChange={this.handleChange} />
                            {submitted && !first_name &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !last_name ? ' has-error' : '')}>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" value={last_name} onChange={this.handleChange} />
                            {submitted && !last_name &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email">e-mail</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">e-mail is required</div>
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
                                <div className="help-block">Category is required</div>
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
                                    <div className="help-block">Manager is required</div>
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
                            <div className={'alert alert-danger'}>{error}</div>
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