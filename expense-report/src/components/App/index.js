import React, { Component } from 'react';
import './index.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from '../Header'
import Footer from '../Footer'
import Authentification from '../Authentification'
import Home from '../Home'

class App extends Component {

  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      err: '',
    }
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
                        <Route path="/login" component={Authentification} />
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


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default App;
