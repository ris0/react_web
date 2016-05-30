import React from 'react'
import { Link } from 'react-router'
import { findDOMNode } from 'react-dom'
import SocialButtons from './SocialButtons'

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
        const { navLinks } = this.props
        return (
            <div className="main-nav" ref="containerElement">
                {
                    navLinks.map((link) =>
                        <div className="link" key={link}>
                            <Link to={`/${link}`}>{link}</Link>
                        </div>)
                }
                <SocialButtons />
            </div>
        )
    }
}

MainNavigation.propTypes = {
    navLinks: React.PropTypes.array,
    onClick: React.PropTypes.func
}

MainNavigation.defaultProps = {
    navLinks: [],
    onClick: () => {}
}

export default MainNavigation
