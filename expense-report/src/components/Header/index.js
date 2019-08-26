import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="Header">
      {localStorage.getItem('user')
        ? <div className="connected">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to="/">
                <a className="navbar-brand" href="/">Expense Reports</a>
              </Link>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to="/">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                {user.category === "manager" ?
                  <li className="nav-item active">
                    <Link to="/reports/viewAll">
                      <a className="nav-link" href="reports/viewAll">My reports</a>
                    </Link>
                  </li>
                  : null
  }
                  {user.category === "employee" ?
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Reports
      </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <Link to="/reports/viewAll">

                        <a className="dropdown-item" href="reports/viewAll">My reports</a>
                      </Link>
                      <Link to="/reports/new">
                        <a className="dropdown-item" href="/reports/new">New report</a>
                      </Link>
                    </div>
                  </li>
                  : null
}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Users
        </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to={"/users/view/" + user._id}>

                      <a className="dropdown-item" href={"/users/view/" + user._id}>My Account</a>
                    </Link>
                    {user.category === "manager" ?
                      <Link to="/users/viewAll">
                        <a className="dropdown-item" href="/users/viewAll">My team</a>
                      </Link>
                      : null
                    }
                    {user.category === "administrateur" ?
                      <div>
                        <Link to="/users/viewAll">
                          <a className="dropdown-item" href="/users/viewAll">All users</a>
                        </Link>
                        <Link to="/users/new">
                          <a className="dropdown-item" href="/users/new">Create users</a>
                        </Link>
                      </div>
                      : null
                    }
                  </div>
                </li>

              </ul>
              <form className="form-inline my-2 my-lg-0">
                <Link to="/login">
                  <button className="btn btn-outline-info my-2 my-sm-0">Logout</button>
                </Link>
              </form>
            </div>
          </nav>
        </div>
        : <div className="disconnected">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Expense Reports</Navbar.Brand>
          </Navbar>
        </div>
      }

    </div>
  )
}



export default Header;
