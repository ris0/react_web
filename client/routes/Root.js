import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialButtons from '../components/SocialButtons';
import { fetchConfigData, toggleMainNav } from '../actions'

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
            toggleMainNav,
            showMainNav
        } = this.props;

        return (
            <div className="l-container">
                <Header
                    categories={categories}
                    navLinks={navLinks}
                    onToggleMainNav={toggleMainNav}
                    showMainNav={showMainNav}>
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
        showMainNav: app.showMainNav
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign({ dispatch }, bindActionCreators({ toggleMainNav }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
