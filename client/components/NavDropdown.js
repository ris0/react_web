import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'

class NavDropdown extends React.Component {
    constructor() {
        super()
    }

    // TODO Genericise this componentDidMount/componentWillUnmount behavior into a higher
    // level component, same in components/MainNavigation.js
    componentDidMount() {
        this.clickListener = document.addEventListener('click', (e) => { 
            const node = findDOMNode(this.refs.containerElement)
            if (this.props.showDropdown && node && !node.contains(e.target)) {
                this.props.onToggle()
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickListener)
    }

    render() {
        const { className, children, items, onToggle, showDropdown } = this.props
        let containerClasses = ['nav-dropdown']

        if (className && className.length) {
            containerClasses.push(className)
        }

        if (showDropdown) {
            containerClasses.push('active')
        }

        return (
            <div className={containerClasses.join(' ')} ref="containerElement">
                <a className="nav-dropdown-trigger" onClick={onToggle}>{children}</a>
                {
                    showDropdown ?
                        <div className="nav-dropdown-menu">
                            { 
                                Object.values(items).map((item) =>
                                    <Link
                                        key={item.id}
                                        to={`/categories/${item.name}/${item.id}`}
                                        onClick={onToggle}>{item.name}</Link>)
                            }
                        </div> : null
                }
            </div>
        )
    }
}

NavDropdown.propTypes = {
    className: React.PropTypes.string,
    items: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    showDropdown: React.PropTypes.bool
}

NavDropdown.defaultProps = {
    className: '',
    items: {},
    onToggle: () => {},
    showDropdown: false
}

export default NavDropdown

