import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') //check if there is a user in local storage, if true then render the component, else redirect to login page
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

export const ManagerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).category !== "employee" //check if there is a user in local storage, if true then render the component, else redirect to login page
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).category === "administrateur" //check if there is a user in local storage, if true then render the component, else redirect to login page
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export const EmployeeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).category === "employee" //check if there is a user in local storage, if true then render the component, else redirect to login page
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export const Search = ({onChange, value}) => 
    <form className="form-inline md-form form-sm active-purple-2 mt-2">
        <FontAwesomeIcon icon={ faSearch } aria-hidden="true" />
        <input className="form-control form-control-sm mr-0 w-75" style={{border: 0}} type="text" placeholder="Search" aria-label="Search" onChange={onChange} value={value}/>
    </form>

//While it's possible to bypass this check by manually adding an object to local storage 
//using browser dev tools, this would only give access to the client side component, 
//it wouldn't give access to any real secure data from the server api because valid user credentials are required for this.

