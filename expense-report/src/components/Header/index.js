import React from 'react';
import './index.css';

import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () =>  
    <div className="Header">
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
        />
        { localStorage.getItem('user') 
          ? <div className="connected">
              <Navbar bg="dark" variant="dark">
                <Link to="/">
                  <Navbar.Brand href="#home">Expense Reports</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Link to="/">
                      <Nav.Link href="/">Home</Nav.Link>
                    </Link>
                    <Nav.Link href="#reports">Reports</Nav.Link>
                    <Link to ="/users/viewAll">
                      <Nav.Link href="/users/viewAll">Users</Nav.Link>
                    </Link>
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
