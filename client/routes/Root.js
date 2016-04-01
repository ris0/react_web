import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialButtons from '../components/SocialButtons';

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
