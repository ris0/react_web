import React from 'react'
import SocialButtons from './SocialButtons'
import NavDropdown from './NavDropdown'
import MainNavigation from './MainNavigation'
import { Link } from 'react-router'

class Header extends React.Component {
    constructor() {
        super()
        this.state = { showCategoryDropdown: false }
        this.toggleMainNavigation = this.toggleMainNavigation.bind(this)
        this.toggleCategoryDropdown = this.toggleCategoryDropdown.bind(this)
    }

    toggleMainNavigation() {
        this.props.onToggleMainNav()
    }

    toggleCategoryDropdown() {
        this.setState({
            showCategoryDropdown: !this.state.showCategoryDropdown
        })
    }

    render() {
        const { categories, children, navLinks, showMainNav } = this.props
        const { showCategoryDropdown } = this.state

        return (
            <div className="l-header-container">
                { 
                    showMainNav ?
                        <MainNavigation onClick={this.toggleMainNavigation} navLinks={navLinks} /> :
                        null
                }
                <div className="l-header-main">
                    <header className="header-main">
                        <h1>
                            <a onClick={this.toggleMainNavigation}>
                                <span className="icon icon-hamburger" />
                            </a>
                        </h1>
                        <h1>
                            <Link to="/"><img src="/logo.png" alt="Knowsy" /></Link>
                        </h1>
                        <NavDropdown
                            className="header-link-right"
                            items={categories}
                            onToggle={this.toggleCategoryDropdown}
                            showDropdown={showCategoryDropdown}>
                            <h2>categories</h2>
                        </NavDropdown>
                        <div className="nav">
                            <SocialButtons />
                        </div>
                    </header>
                    {children}
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    categories: React.PropTypes.object,
    navLinks: React.PropTypes.array,
    showMainNav: React.PropTypes.bool,
    onToggleMainNav: React.PropTypes.func
}

Header.defaultProps = {
    categories: {},
    navLinks: [],
    showMainNav: false,
    onToggleMainNav: () => {}
}

export default Header

