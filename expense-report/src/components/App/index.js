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
import AllReportsPage from '../AllReportsPage'
import CreateReportPage from '../CreateReportPage'

import { PrivateRoute, AdminRoute, ManagerRoute, EmployeeRoute } from '../_components' //component that redirect to login if not connected

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
      <div className="App bg-white" style={{minHeight:"100vh", position:"relative"}}>
        <Router>
          <div>
            <div className="header sticky-top">
              <Header updateAuthentification={this.updateAuthentification} />
            </div>
            <div className="jumbotron bg-white">
              <div className="container">
                <div className="col-sm-12 col-sm-offset-2">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <AdminRoute exact path="/users/new" component={CreateUserPage} />
                  <ManagerRoute exact path="/users/viewAll" component={AllUsersPage} />
                  <PrivateRoute exact path="/users/view/:_id" component={ViewUserPage} />
                  <PrivateRoute exact path="/reports/viewAll" component={AllReportsPage}/>
                  <EmployeeRoute exact path="/reports/new" component={CreateReportPage}/>
                  <Route exact path="/login" render={(props) => <AuthentificationPage {...props} updateAuthentification={this.updateAuthentification} />} />
                </div>
              </div>
            </div>
          </div>
        </Router>
        <footer className="sticky-bottom">
              <Footer />
        </footer>
      </div>


    );
  }
}

export default App;
