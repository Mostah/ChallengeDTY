import { API_URL } from '../constants/index.js';

import { userService } from './userService';

export const reportService = {
    createReport,
    deleteReport,
    updateReport,
    getReportId,
};

function createReport(title, amount, currency, comment, author, manager) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({ title, amount, currency, comment, manager, author }),
    }
    return fetch(`${API_URL}/reports/createReport`, requestedOptions)
        .then(response => response.statusText)
}

function deleteReport( _id ) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({ _id }),
    }
    return fetch(`${API_URL}/reports/deleteReport`, requestedOptions)
        .then(deleteCount => deleteCount)
}

function updateReport( reportJSON ) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify(reportJSON), 
    }
    return fetch(`${API_URL}/reports/updateReport`, requestedOptions)
        .then(response => response.statusText)
}

function getReportId(_id) {
    let base64 = require('base-64');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestedOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + base64.encode(user.pseudo + ":" + user.password)},
        body: JSON.stringify({ _id }),
    }
    return fetch(`${API_URL}/reports/getReportId`, requestedOptions)
        .then(handleResponse)
        .then(report => report)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}