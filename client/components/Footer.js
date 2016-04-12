import React from 'react';

export default function Footer(props) {
    const { navLinks } = props;
    return (
        <footer className="footer-main">
            <div>
                <h1>knowsy</h1>
                <p>C 2016 Copyright Knowsy.com</p>
                <p>All Rights Reserved</p>
            </div>
            <div className="footer-right">
                <div className="nav-links">
                    {navLinks.map((link) => <div key={link}><a>{link}</a></div>)}
                </div>
                <address>
                    <p>knowsy@knowsy.com</p>
                    <p>+1 (202) 889 8989</p>
                    <p>+1 (202) 889 7878</p>
                </address>
            </div>
        </footer>
    )
}
