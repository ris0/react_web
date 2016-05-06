import React from 'react';

function Footer(props) {
    const { navLinks } = props;
    return (
        <footer className="footer-main">
            <div>
                <h1>knowsy</h1>
                <p>C 2016 Copyright Knowsy</p>
                <p>All Rights Reserved</p>
            </div>
            <div className="footer-right">
                <div className="nav-links">
                    {navLinks.map((link) => <div key={link}><a>{link}</a></div>)}
                </div>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    navLinks: React.PropTypes.array
}

Footer.defaultProps = {
    navLinks: []
}

export default Footer
