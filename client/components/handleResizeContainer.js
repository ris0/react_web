import React, { createElement } from 'react'

export default function handleResizeContainer(Component) {
    class HandleResizeWrapper extends React.Component {
        constructor() {
            super()
            this.state = {
                windowWidth: window.innerWidth
                // isMobile: false ???
            }
            this.handleResize = this.handleResize.bind(this)
        }

        componentDidMount() {
            window.addEventListener('resize', this.handleResize)
        }

        handleResize(e) {
            this.setState({
                windowWidth: window.innerWidth
            })
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize)
        }

        render() {
            const { windowWidth } = this.state
            const mergedProps = Object.assign({}, { windowWidth }, this.props)

            return createElement(Component, mergedProps)
        }
    }

    return HandleResizeWrapper
}

