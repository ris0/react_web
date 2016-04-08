import React from 'react'

class NavDropdown extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { className, label, items, onToggle, showDropdown } = this.props

        return (
            <div className={`nav-dropdown ${className}`}>
                <a className="nav-dropdown-trigger" onClick={onToggle}>{label}</a>
                {
                    showDropdown ?
                        <div className="nav-dropdown-menu">
                            { items.map((item) => <a href={item.link} key={item.name}>{item.name}</a>) }
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
