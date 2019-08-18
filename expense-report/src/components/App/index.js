import React, { Component } from 'react';
import './index.css';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../Header'
import Footer from '../Footer'
import AuthentificationPage from '../AuthentificationPage'
import Home from '../Home'
import { PrivateRoute } from '../_components' //component that redirect to login if not connected
import { authHeader } from '../_helpers'

class App extends Component {

  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      user: { },
      err: '',
    }
    this.updateAuthentification = this.updateAuthentification.bind(this)
  }

  updateAuthentification() {
    localStorage.getItem('user') ?
      this.setState({ isAuthenticated: true})
      : this.setState({ isAuthenticated: false})
  }

  render () {
    const { isAuthenticated, err } = this.state;
    return (
      <div className="App">
        <Header isAuthenticated={isAuthenticated}/>
        <div className="jumbotron">
          <div className="container">
            <div className="col-sm-8 col-sm-offset-2">
              <Router>
                <div>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route path="/login" render={(props) => <AuthentificationPage {...props} updateAuthentification={this.updateAuthentification} />}/>
                </div>
              </Router>
            </div>
          </div>
        </div>
        <Footer />
      </div>


    );
  }
}

export default App;
