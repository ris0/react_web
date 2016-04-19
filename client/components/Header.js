import React from 'react'
import { findDOMNode } from 'react-dom'
import SocialButtons from './SocialButtons'
import NavDropdown from './NavDropdown'
import { Link } from 'react-router'

class MainNavigation extends React.Component {
    constructor() {
        super()
    }

    // TODO Genericise this componentDidMount/componentWillUnmount behavior into a higher
    // level component, same in components/NavDropdown.js
    componentDidMount() {
        this.clickListener = document.addEventListener('click', (e) => { 
            const node = findDOMNode(this.refs.containerElement)
            if (node && !node.contains(e.target)) {
                this.props.onClick()
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickListener)
    }

    render() {
        const { onClick, navLinks } = this.props
        return (
            <div className="main-nav" ref="containerElement">
                {navLinks.map((link) => <div className="link" key={link}><a>{link}</a></div>)}
                <SocialButtons />
            </div>
        )
    }
}

class Header extends React.Component {
    constructor() {
        super()
        this.state = { showCategoryDropdown: false }
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
                        <MainNavigation onClick={this.toggleMainNavigation.bind(this)} navLinks={navLinks} /> :
                        null
                }
                <div className="l-header-main">
                    <header className="header-main">
                        <h1 className="header-link">
                            <a onClick={this.toggleMainNavigation.bind(this)}>
                                <span className="icon icon-hamburger" />
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
    showMainNav: React.PropTypes.bool,
    onToggleMainNav: React.PropTypes.func
}

Header.defaultProps = {
    navLinks: [],
    showMainNav: false,
    onToggleMainNav: () => {}
}

export default Header

