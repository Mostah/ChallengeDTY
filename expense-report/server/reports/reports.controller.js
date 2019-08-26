const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

const reportService = require('./report.service');
const userService = require('../users/user.service')

// routes
router.post('/createReport', createReport);
router.post('/updateReport', updateReport);
router.post('/deleteReport', deleteReport);
router.post('/getReportId', getReportId);

function createReport(req, res, next) {
    reportService.createReport(req.body)
        .then(response => res.send('Report succesfully saved'))
        .catch(err => next(err))
}

function updateReport(req, res, next) {
    reportService.updateReport(req.body)
        .then(response => res.send('Report succesfully changed'))
        .catch(err => next(err))
}

function deleteReport(req, res, next) {
    reportService.deleteReport(req.body)
        .then(count => res.send(count))
        .catch(err => next(err))
}

function getReportId(req, res, next) {
    reportService.getReportId(req.body)
        .then(report => report ? res.json(report) : res.status(400).json({message: 'Report not found' }))
        .catch(err => next(err))
}

module.exports = router; 