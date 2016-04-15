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
                        <video poster={video.cover_resource}>
                            <source type="video/mp4" src={video.resource}></source>
                            <h1>I'm sorry; your browser doesn't support HTML5 video.</h1>
                       </video> : null
                }
           </div>
        )
    }
}

export default FlowPlayer
