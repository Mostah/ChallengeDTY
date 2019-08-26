import React from 'react';
import './index.css';

import { faCheck, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ReportWidget = ({ report, author, onDelete, onValidate, onDecline }) => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    return (
        <tr className="accordion-toggle">
            <td>
                <div class="panel-group" id="accordion">
                    <div className="row">
                        <div className="col-3">
                            {localUser.category === "manager" ?
                                <img className="profileImg" src="https://bootdey.com/img/Content/user_1.jpg" alt="Profile Author" />
                                : null
                            }
                        </div>
                        <div className="col-9">
                            <a className="user-link" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + report._id}>
                                <span>{report.title}</span>
                            </a>
                            <div className="row">
                                {author && author.description && localUser.category === "manager" ?
                                    <span className="user-subhead">{author.description.first_name} {author.description.last_name}</span>
                                    : null
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div id={"collapse" + report._id} class="panel-collapse collapse in">
                        <div class="panel-body" style={{marginLeft:"20px"}}>Description : {report.comment}</div>
                    </div>
                </div>

            </td>
            <td>{report.date.slice(0, 10)}</td>
            <td className="text-center">{report.amount}</td>
            <td className="text-center"><strong>{report.currency}</strong></td>
            {report.status === "pending" ?
                <td className="text-center">
                    <span className="label label-default text-warning">{report.status}</span>
                </td>
                : null
            }
            {report.status === "validated" ?
                <td className="text-center">
                    <span className="label label-default text-success">{report.status}</span>
                </td>
                : null
            }
            {report.status === "declined" ?
                <td className="text-center">
                    <span className="label label-default text-danger">{report.status}</span>
                </td>
                : null
            }
            <td className="text-center" style={{ width: "20%" }}>
                {localUser.category === "employee" && report.status !== "validated" ?
                    <button className="btn btn-danger" onClick={onDelete} value={report._id}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    : null
                }
                {localUser.category === "manager" && report.status === "pending" ?
                    <div>
                        <button style={{ margin: "2px" }} className="btn btn-success" onClick={onValidate} value={report._id}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button style={{ margin: "2px" }} className="btn btn-danger" onClick={onDecline} value={report._id}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    : null
                }

            </td>
        </tr>
    )
}

