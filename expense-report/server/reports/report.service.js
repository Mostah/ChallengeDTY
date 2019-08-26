var User = require('../structure/user');
var mongoose = require('mongoose');
var Report = require('../structure/report');

module.exports = {
    createReport,
    deleteReport,
    updateReport,
    getReportId,
}; 

async function createReport(body) {
    newId = new mongoose.Types.ObjectId()
    const new_report = new Report({
        _id: newId,
        title: body.title,
        date: new Date(),
        amount: body.amount,
        currency: body.currency,
        comment: body.comment,
        author: body.author,
        manager: body.manager,
        document: body.document,
        status: "pending",
    });
    await new_report.save(function(err) {
        if (err) throw err;            
        console.log('Report succesfully saved by user : ' + body.author)
    });

    const manager = await User.findOne({ _id: body.manager });
    manager.reports.push(newId);
    await manager.save(function(err) {
        if (err) throw err;            
    })

    const author = await User.findOne({ _id: body.author });
    author.reports.push(newId);
    await author.save(function(err) {
        if (err) throw err;            
    })

    return 'ok';
}

async function updateReport(body) {
    await Report.findOne({ _id: body._id }).then(report => {
        report.title = body.title;
        report.amount = body.amount;
        report.currency = body.currency;
        report.comment = body.comment;
        report.author = body.author;
        report.manager = body.manager;
        report.document = body.document;
        report.status = body.status;
        report.save(function(err) {
            if (err) throw err
            console.log('Report succesfully changed by user : ' + body.author)
        });
        return 'ok'
    })
}

async function deleteReport({ _id }) {
    const report = await Report.findOne({ _id: _id });

    const author = await User.findOne({ _id: report.author });
    author.reports = author.reports.filter(report => report._id != _id);
    await author.save(function(err) {
        if (err) throw err;            
    })

    const manager = await User.findOne({ _id: report.manager });
    manager.reports = manager.reports.filter(report => report._id != _id)
    await manager.save(function(err) {
        if (err) throw err;            
    })

    const response = await Report.deleteOne({ _id: _id })
    return response.deletedCount
}

async function getReportId({ _id }) {
    const report = await Report.findOne({ _id: _id });
    return report
}