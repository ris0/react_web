import React from 'react'
import SocialButtons from './SocialButtons'
import NavDropdown from './NavDropdown'
import { Link } from 'react-router'

function CollapsibleNav(props) {
    const { onClick, navLinks } = props
    return (
        <div className="collapsible-nav">
            {navLinks.map((link) => <div className="link" key={link}><a>{link}</a></div>)}
            <SocialButtons />
        </div>
    )
}

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
                        <CollapsibleNav onClick={this.toggleDropdownNav.bind(this)} navLinks={navLinks} /> :
                        null
                }
                <div className="l-header-main">
                    <header className="header-main">
                        <h1 className="header-link">
                            <a onClick={this.toggleDropdownNav.bind(this)}>
                                <span className={`icon ${showDropdownNav ? 'icon-hamburger' : 'icon-hamburger'}`}/>
                            </a>
                        </h1>
                        <h1 className="header-link">
                            <Link to="/"><img src="/logo.png" alt="Knowsy" /></Link>
                        </h1>
                        <NavDropdown
                            className="header-link header-link-right"
                            items={categories}
                            onToggle={this.toggleCategoryDropdown.bind(this)}
                            showDropdown={showCategoryDropdown}>
                            <h2>categories</h2>
                        </NavDropdown>
                        <div className="nav header-link">
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
    navLinks: React.PropTypes.array,
    showDropdownNav: React.PropTypes.bool,
}

Header.defaultProps = {
    navLinks: [],
    showDropdownNav: false
}


export default Header
