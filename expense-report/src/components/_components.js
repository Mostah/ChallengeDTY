import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') //check if there is a user in local storage, if true then render the component, else redirect to login page
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

//While it's possible to bypass this check by manually adding an object to local storage 
//using browser dev tools, this would only give access to the client side component, 
//it wouldn't give access to any real secure data from the server api because valid user credentials are required for this.

