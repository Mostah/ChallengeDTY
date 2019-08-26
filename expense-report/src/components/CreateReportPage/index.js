import React, { Component } from 'react';
import './index.css';

import { reportService } from '../../services/reportService'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CreateReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            currency: '',
            amount: '',
            description: '',
            submitted: false,
            loading: false,
            created: false,
            error: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const localUser = JSON.parse(localStorage.getItem('user'));
        this.setState({ submitted: true });
        const { title, currency, amount, description } = this.state //to complete

        // stop here if form is invalid
        if (!(title && currency && amount)) { //to complete
            return;
        }
        this.setState({ loading: true })
        reportService.createReport(title, amount, currency, description, localUser._id, localUser.manager )
            .then(text => {
                if (text === "OK") {
                    this.setState({ created: true });
                    this.reset();
                }
                else {
                    this.setState({ error: text, loading: false })
                }
            });
    }

    reset() {
        this.setState({
            title: '',
            currency: '',
            amount: '',
            description: '',
            submitted: false,
            loading: false,
            error: '',
        })
    }

    render() {
        const { title, currency, amount, description, submitted, loading, created, error } = this.state;
        return (
            <div className='CreateUserPage'>
                <div className="row justify-content-md-center">
                    <h2 className="display-3">Create Report</h2>
                </div>
                <hr />
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" name="title" placeholder="title of the report..." value={title} onChange={this.handleChange} />
                                {submitted && !title &&
                                    <small className="text-danger">Title is required</small>
                                }
                            </div>
                        </div>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-8">
                            <div className={'form-group' + (submitted && !amount ? ' has-error' : '')}>
                                <label htmlFor="amount">Amount</label>
                                <input type="number" className="form-control" name="amount" placeholder="25" value={amount} onChange={this.handleChange} />
                                {submitted && !amount &&
                                    <small className="text-danger">Amount is required</small>
                                }
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div className={'form-group' + (submitted && !currency ? ' has-error' : '')}>
                                <label htmlFor="currency">Currency</label>
                                <select className="form-control" name="currency" value={currency} onChange={this.handleChange}>
                                    <option value="none">- - - - - - -</option>
                                    <option value="USD $">USD $</option>
                                    <option value="EURO €">Euro €</option>
                                    <option value="SGD $">SGD $</option>
                                    <option value="POUND £">Pound £</option>
                                </select>
                                {submitted && !currency && currency !== "none" &&
                                    <small className="text-danger">Currency is required</small>
                                }
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className={'form-group' + (description && !description ? ' has-error' : '')}>
                                <label htmlFor="description">Description</label>
                                <textarea rows="5" className="form-control" name="description" placeholder="Optional..." value={description} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <br />
                    <div className="row justify-content-md-center">
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Create</button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt='loading' />
                            }
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        {error &&
                            <div className='alert alert-danger text-center'>Message from server : {error}</div>
                        }
                        {created && !error &&
                            <div className='alert alert-success text-center'>Report Succesfully Created</div>
                        }
                    </div>
                </form>
            </div >
        );
    }

}

export default CreateReportPage