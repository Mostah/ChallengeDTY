import React from 'react';
import './index.css';

function Footer () {
    return (
        <div className="Footer">
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossorigin="anonymous"
            />
            <footer className="page-footer font-small bg-dark">
                <div className="footer-copyright text-center py-3 fixed-bottom">© 2019 Copyright :
                    <a href="https://paris-digital-lab.com/"> Paris Digital Lab</a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;