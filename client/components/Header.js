import React from 'react';
import SocialButtons from './SocialButtons';
import { Link } from 'react-router';

class Header extends React.Component {
    constructor() {
        super();
    }

    toggleDropdownNav() {
        console.log('toggle...');
    }

    render() {
        const { children, navLinks, showDropdownNav } = this.props;

        return (
            <div className="l-header-container">
                {
                    showDropdownNav ?
                        <div className="collapsible-nav">
                            <header>
                                <a onClick={this.toggleDropdownNav.bind(this)}><i className="fa fa-times" /></a>
                            </header>
                            {navLinks.map((link) => <div className="link" key={link}><a>{link}</a></div>)}
                            <SocialButtons className="" />
                        </div> : null
                }
                <div className="l-header-main">
                    <div className="header-topbar">
                        <header>
                            { /* TODO remove vs hide? */
                                !showDropdownNav ?
                                    <a onClick={this.toggleDropdownNav.bind(this)}>
                                        <i className="fa fa-bars" />
                                    </a> : null
                            }
                            <Link to="/">
                                <h1>Knowsy</h1>
                            </Link>
                            <Link className="page-title" to="/videos/2">TestVideo</Link>

                            {/* breadcrumbs? <h2>Categories</h2> */}
                            <div className="nav">
                                <SocialButtons />
                            </div>
                        </header>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    navLinks: React.PropTypes.array,
    showDropdownNav: React.PropTypes.bool,
}

Header.defaultProps = {
    navLinks: [],
    showDropdownNav: false
}


export default Header;
