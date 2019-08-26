import React, { Component } from 'react';
import './index.css';

import { reportService } from '../../services/reportService'
import { userService } from '../../services/userService'

import { ReportWidget } from './reportWidget'

import { Search } from '../_components'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


class AllReportsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            reportsFiltered: [],
            searchEntry: '',
            user: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.delete = this.delete.bind(this);
        this.onValidate = this.onValidate.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    componentDidMount() {
        const localUser = JSON.parse(localStorage.getItem('user'));
        const reports = [];
        const authors = [];
        userService.getUserId(localUser._id)
            .then(user =>
                user.reports.map(reportId =>
                    reportService.getReportId(reportId)
                        .then(report => {
                            reports.push(report);
                            userService.getUserId(report.author)
                                .then(user => { //there is an issue, my search doesn't work well with a class component (with state...)
                                    authors.push(user) //so i have to do this to have a stateless component 
                                    this.setState({ reports, reportsFiltered: reports, authors });
                                })
                            
                        })
                )
            )
    }

    handleChange(e) {
        const { reports, authors } = this.state;
        const reportsFiltered = reports.filter(report => {
            const author = authors.filter(author => author._id === report.author)[0];
            return report.amount.toString().includes(e.target.value.toString()) || report.currency.includes(e.target.value.toString()) || 
            author.description.first_name.toLowerCase().includes(e.target.value.toString().toLowerCase()) || 
            author.description.last_name.toLowerCase().includes(e.target.value.toString().toLowerCase()) || 
            report.title.toLowerCase().includes(e.target.value.toString().toLowerCase())
        });
        this.setState({ searchEntry: e.target.value, reportsFiltered })
    }

    delete(_id) {
        const { reports, authors, searchEntry } = this.state;
        const updatedReports = reports.filter(report => report._id !== _id);
        const reportsFiltered = updatedReports.filter(report => {
                const author = authors.filter(author => author._id === report.author)[0];
                return report.amount.toString().includes(searchEntry.toString()) || report.currency.includes(searchEntry.toString()) || 
                author.description.first_name.toLowerCase().includes(searchEntry.toString().toLowerCase()) || 
                author.description.last_name.toLowerCase().includes(searchEntry.toString().toLowerCase()) ||
                report.title.toLowerCase().includes(searchEntry.toString().toLowerCase())
            });
        this.setState({ reports: updatedReports, reportsFiltered })
        reportService.deleteReport(_id)
    }

    onDelete(e) {
        const _id = e.target.value;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this ? This action is irreversible',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.delete(_id)
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
        });
    }

    onValidate(e) {
        const _id = e.target.value;
        const { reports } = this.state;
        const report = reports.find( item => item._id === _id);
        report.status = "validated";
        const newReports = reports.filter( item => item._id !== _id);
        newReports.push(report);
        this.setState({ reports: newReports });
        reportService.updateReport(report);
    }

    onDecline(e) {
        const _id = e.target.value;
        const { reports } = this.state;
        const report = reports.find( item => item._id === _id);
        report.status = "declined";
        const newReports = reports.filter( item => item._id !== _id);
        newReports.push(report);
        this.setState({ reports: newReports });
        reportService.updateReport(report);
    }

    render() {
        const { reportsFiltered, searchEntry, authors } = this.state
        return (
            <div className="container bootstrap snippet">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box no-header clearfix">
                            <div className="row justify-content-md-center">
                                <h2 className="display-4">Expense Reports</h2>
                            </div>
                            <br />
                            <div className="row justify-content-md-center">
                                <div className="col-12">
                                    <div className="Search">
                                        <Search onChange={this.handleChange} value={searchEntry} />
                                    </div>
                                </div>
                            </div>
                            {reportsFiltered.filter(report => report.status === "pending").length !== 0 ?
                            
                            <div>
                                <hr />
                            <h2>Pending requests</h2>
                            <br />
                            <div className="main-box-body clearfix">
                                <div className="table-responsive">
                                    <table className="table user-list">
                                        <thead>
                                            <tr>
                                                <th><span>Title</span></th>
                                                <th><span>Created</span></th>
                                                <th className="text-center"><span>Amount</span></th>
                                                <th className="text-center"><spans>Currency</spans></th>
                                                <th className="text-center"><span>Status</span></th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportsFiltered.filter(report => report.status === "pending")
                                                .map(report => {
                                                    const cut = authors.filter(author => author._id === report.author);
                                                    return <ReportWidget report={report} author={cut[0]} onDelete={this.onDelete} onValidate={this.onValidate} onDecline={this.onDecline}/>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                            : null
                            }
                            {reportsFiltered.filter(report => report.status !== "pending").length !== 0 ?
                            <div>
                            <hr />
                            <h2>Resolved requests</h2>
                            <br />
                            <div className="main-box-body clearfix">
                                <div className="table-responsive">
                                    <table className="table user-list">
                                        <thead>
                                            <tr>
                                                <th><span>Title</span></th>
                                                <th><span>Created</span></th>
                                                <th className="text-center"><span>Amount</span></th>
                                                <th className="text-center"><spans>Currency</spans></th>
                                                <th className="text-center"><span>Status</span></th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportsFiltered.filter(report => report.status !== "pending")
                                                .map(report => {
                                                    const cut = authors.filter(author => author._id === report.author);
                                                    return <ReportWidget report={report} author={cut[0]} onDelete={this.onDelete} onValidate={this.onValidate} onDecline={this.onDecline}/>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                            : null
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default AllReportsPage


