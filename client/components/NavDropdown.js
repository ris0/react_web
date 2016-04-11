import React from 'react'
import { Link } from 'react-router'

class NavDropdown extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { className, children, items, onToggle, showDropdown } = this.props

        return (
            <div className={`nav-dropdown ${className}`}>
                <a className="nav-dropdown-trigger" onClick={onToggle}>{children}</a>
                {
                    showDropdown ?
                        <div className="nav-dropdown-menu">
                            { items.map((item) => <Link to={`/categories/${item.link}`} onClick={onToggle} key={item.name}>{item.name}</Link>) }
                        </div> : null
                }
            </div>
        )
    }
}

NavDropdown.defaultProps = {
    className: ''
}

export default NavDropdown
