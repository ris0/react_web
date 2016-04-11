import React from 'react'
import SocialButtons from './SocialButtons'
import NavDropdown from './NavDropdown'
import { Link } from 'react-router'

class Header extends React.Component {
    constructor() {
        super()
        this.state = { showCategoryDropdown: false }
    }

    toggleDropdownNav() {
        this.props.onToggleDropdownNav()
    }

    toggleCategoryDropdown() {
        this.setState({
            showCategoryDropdown: !this.state.showCategoryDropdown
        })
    }

    render() {
        const { categories, children, navLinks, showDropdownNav } = this.props
        const { showCategoryDropdown } = this.state

        return (
            <div className="l-header-container">
                {
                    showDropdownNav ?
                        <div className="header-topbar collapsible-nav">
                            <header>
                                <a onClick={this.toggleDropdownNav.bind(this)}>
                                    <h1><i className="fa fa-times" /></h1>
                                </a>
                            </header>
                            {navLinks.map((link) => <div className="link" key={link}><a>{link}</a></div>)}
                            <SocialButtons />
                        </div> : null
                }
                <div className="l-header-main">
                    <div className="header-topbar">
                        <header>
                            {
                                !showDropdownNav ?
                                    <a onClick={this.toggleDropdownNav.bind(this)}>
                                        <h1><i className="fa fa-bars" /></h1>
                                    </a> : null
                            }
                            <Link to="/">
                                <h1>Knowsy</h1>
                            </Link>
                            <NavDropdown
                                className="header-link"
                                items={categories}
                                onToggle={this.toggleCategoryDropdown.bind(this)}
                                showDropdown={showCategoryDropdown}>
                                <h2>categories</h2>
                            </NavDropdown>
                            <div className="nav">
                                <SocialButtons />
                            </div>
                        </header>
                    </div>
                    {children}
                </div>
            </div>
        )
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


export default Header
