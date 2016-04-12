import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialButtons from '../components/SocialButtons';
import { fetchConfigData, toggleDropdownNav } from '../actions'

class Root extends React.Component {
    static fetchData(dispatch) {
        return dispatch(fetchConfigData())
    }

    constructor() {
        super();
    }

    componentDidMount() {
        const { dispatch } = this.props
        Root.fetchData(dispatch)
            .catch((err) => {
                // TODO redirect to Error page
            })
    }

    render() {
        const {
            main,
            header,
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
    const { categories, app } = state
    return {
        categories,
        navLinks: app.navLinks,
        showDropdownNav: app.showDropdownNav
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign({ dispatch }, bindActionCreators({ toggleDropdownNav }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
