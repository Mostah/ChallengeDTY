import { API_URL } from '../constants/index.js';
import { authHeader } from '../components/_helpers'

export const userService = {
    login,
    logout,
    createUser,
    getCategory,
    getUserId,
    getUserPseudo,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${API_URL}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
    
}

function logout() {
    localStorage.removeItem('user');
}

function createUser(pseudo, password, first_name, last_name, email, category, manager) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({ pseudo, password, first_name, last_name, email, category, manager}),
    }
// need to add a request to add a member of a team in the db of the manager
    return fetch(`${API_URL}/users/createUser`, requestedOptions)
        .then(response => response.statusText)
}

function getUserPseudo(pseudo) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({ pseudo }),
    }
    return fetch(`${API_URL}/users/getUserPseudo`, requestedOptions)
        .then(handleResponse)
        .then(user => user)
}

function getUserId(_id) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({ _id }),
    }
    return fetch(`${API_URL}/users/getUserId`, requestedOptions)
        .then(handleResponse)
        .then(user => user)
}

function getCategory(category) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({category})
    }

    return fetch(`${API_URL}/users/getCategory`, requestedOptions)
        .then(handleResponse)
        .then(list_category => list_category)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

//In the handleResponse method the service checks if the http response from the api is 401 Unauthorized and automatically 
//logs the user out. This handles if the credentials are incorrect or if the user is no longer valid for any reason.