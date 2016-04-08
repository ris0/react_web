import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialButtons from '../components/SocialButtons';
import { toggleDropdownNav } from '../actions'

class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            main,
            header,
            isLoading,
            categories,
            navLinks,
            toggleDropdownNav,
            showDropdownNav
        } = this.props;

        return (
            <div className="l-container">
                <Header
                    categories={categories}
                    navLinks={navLinks}
                    onToggleDropdownNav={toggleDropdownNav}
                    showDropdownNav={showDropdownNav}>
                    {header}
                </Header>
                <div className="l-main">{main}</div>
                <Footer navLinks={navLinks} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.app.isLoading,
        navLinks: state.app.navLinks,
        categories: state.app.categories,
        showDropdownNav: state.app.showDropdownNav
    }
}

export default connect(mapStateToProps, { toggleDropdownNav })(Root);
