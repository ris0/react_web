import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../components/Footer';
import SocialButtons from '../components/SocialButtons';

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
                            <Link to="/videos/1">TestVideo</Link>

                            {/* breadcrumbs? <h2>Categories</h2> */}
                            <div className="nav">
                                <SocialButtons className="nav-links" />
                            </div>
                        </header>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        // TODO set up object rest spread...
        const { main, header, isLoading, navLinks, showDropdownNav } = this.props;
        {/* isLoading ? <h1>L O A D I N G</h1> : null*/}

        return (
            <div className="container">
                <Header navLinks={navLinks} showDropdownNav={showDropdownNav}>
                    {header}
                </Header>
                <div className="main">{main}</div>
                <Footer navLinks={navLinks} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.app.isLoading,
        navLinks: state.app.navLinks,
        showDropdownNav: state.app.showDropdownNav
    }
}

export default connect(mapStateToProps)(Root);
