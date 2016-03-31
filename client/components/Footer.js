import React from 'react';

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { navLinks } = this.props;
        return (
            <footer>
                <div>
                    <h1>KNOWSY</h1>
                    <p>C 2016 Copyright Knowsy.com</p>
                    <p>All Rights Reserved</p>
                </div>
                <div className="footer-right">
                    <div className="nav-links">
                        {navLinks.map((link) => <div key={link}><a>{link}</a></div>)}
                    </div>
                    <address>
                        knowsy@knowsy.com
                        +1 (202) 889 8989
                        +1 (202) 889 7878
                    </address>
                </div>
            </footer>
        );
    }
}

export default Footer;
