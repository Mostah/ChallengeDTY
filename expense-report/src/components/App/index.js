import React, { Component } from 'react';
import './index.css';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../Header'
import Footer from '../Footer'
import AuthentificationPage from '../AuthentificationPage'
import HomePage from '../HomePage'
import { PrivateRoute } from '../_components' //component that redirect to login if not connected
import { authHeader } from '../_helpers'

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
      this.setState({isAuthenticated: true})
      : this.setState({isAuthenticated: false})
  }

  updateAuthentification(isAuthenticated) {
    this.setState({isAuthenticated})
  }

  render () {
    return (
      <div className="App">
        <Router>
          <div>
            <Header updateAuthentification={this.updateAuthentification}/>
            <div className="jumbotron">
              <div className="container">
                <div className="col-sm-12 col-sm-offset-2">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route exact path="/login" render={(props) => <AuthentificationPage {...props} updateAuthentification={this.updateAuthentification} />}/>
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
