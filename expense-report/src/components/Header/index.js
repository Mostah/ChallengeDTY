import React from 'react';
import './index.css';

import { Navbar, Nav, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Header = ({ }) =>  
    <div className="Header">
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />
        { localStorage.getItem('user') 
          ? <div className="connected">
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Expense Reports</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#reports">Reports</Nav.Link>
                    <Nav.Link href="#team">My Team</Nav.Link>
                    <Nav.Link href="/login">Users</Nav.Link>
                </Nav>
                <Link to="/login">
                  <Button variant="outline-info">Logout</Button>
                </Link>
                
              </Navbar>
            </div>
          : <div className="disconnected">
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Expense Reports</Navbar.Brand>
              </Navbar>
            </div>
        }
        
    </div>



export default Header;
