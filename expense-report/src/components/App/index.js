import React, { Component } from 'react';
import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../Header'
import Footer from '../Footer'
import AuthentificationPage from '../AuthentificationPage'
import HomePage from '../HomePage'
import CreateUserPage from '../CreateUserPage'
import AllUsersPage from '../AllUsersPage'
import ViewUserPage from '../ViewUserPage'

import { PrivateRoute } from '../_components' //component that redirect to login if not connected

class App extends Component {

  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      err: '',
    }

    this.updateAuthentification = this.updateAuthentification.bind(this);
  }

  componentDidMount() {
    localStorage.getItem('user') ?
      this.setState({ isAuthenticated: true })
      : this.setState({ isAuthenticated: false })
  }

  updateAuthentification(isAuthenticated) {
    this.setState({ isAuthenticated })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header updateAuthentification={this.updateAuthentification} />
            <div className="jumbotron">
              <div className="container">
                <div className="col-sm-12 col-sm-offset-2">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute exact path="/users/new" component={CreateUserPage} />
                  <PrivateRoute exact path="/users/viewAll" component={AllUsersPage} />
                  <PrivateRoute exact path="/users/view/:_id" component={ViewUserPage} />
                  <Route exact path="/login" render={(props) => <AuthentificationPage {...props} updateAuthentification={this.updateAuthentification} />} />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </div>


    );
  }
}

export default App;
