import React from 'react'

class FlowPlayer extends React.Component {
    constructor() {
        super()
        this.state = { isLoaded: false }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        }, () => {
            $(this.refs.player).flowplayer()
        })
    }
    render() {
        const { video } = this.props
        const { isLoaded } = this.state

        return  (
            <div ref="player" className="functional">
                {
                    isLoaded ?
                        <video poster={'/assets/tequila_sunrise.jpg'}>
                            <source type="video/mp4" src={'/assets/tequilla_sunrise_v2.mp4'/*video.resource*/}></source>
                            <h1>I'm sorry; your browser doesn't support HTML5 video.</h1>
                       </video> : null
                }
           </div>
        )
    }
}

export default FlowPlayer
