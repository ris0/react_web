import React from 'react';
import { Link } from 'react-router'
import NewsletterSignup from './NewsletterSignup'

class Footer extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { navLinks, onClickSubscribe } = this.props;

        return (
            <footer>
                <div className="footer-main">
                    <div className="legal">
                        <Link to="/">
                            <img src="/logo.png" alt="Knowsy" />
                        </Link>
                        <p>C 2016 Copyright Knowsy</p>
                        <p>All Rights Reserved</p>

                    </div>
                    <NewsletterSignup onSubscribe={onClickSubscribe} />
                    <div className="footer-nav">
                        <div className="nav-links">
                            {navLinks.map((link) => <div key={link}><Link to={'/about' /* for now... */}>{link}</Link></div>)}
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = {
    navLinks: React.PropTypes.array
}

Footer.defaultProps = {
    navLinks: [],
    onClickSubscribe: () => {}
}

export default Footer
