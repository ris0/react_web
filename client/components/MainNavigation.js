import React from 'react'
import { Link } from 'react-router'
import SocialButtons from './SocialButtons'

class MainNavigation extends React.Component {
    constructor() {
        super()
    }

    // TODO Genericise this componentDidMount/componentWillUnmount behavior into a higher
    // level component, same in components/NavDropdown.js
    componentDidMount() {
        this.clickListener = document.addEventListener('click', (e) => { 
            const node = this.refs.containerElement
            if (node && !node.contains(e.target)) {
                this.props.onClick()
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickListener)
    }

    render() {
        const { navLinks, onClick, socialIcons } = this.props
        return (
            <div className="main-nav" ref="containerElement">
                {
                    navLinks.map((link) =>
                                 <Link
                                    className="link"
                                    onClick={onClick}
                                    to={`/${link}`}
                                    key={link}>{link}</Link>)
                }
                <SocialButtons icons={socialIcons} />
            </div>
        )
    }
}

MainNavigation.propTypes = {
    navLinks: React.PropTypes.array,
    socialIcons: React.PropTypes.array,
    onClick: React.PropTypes.func
}

MainNavigation.defaultProps = {
    navLinks: [],
    socialIcons: [],
    onClick: () => {}
}

export default MainNavigation
