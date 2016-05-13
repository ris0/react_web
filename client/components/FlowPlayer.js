import React from 'react'

class FlowPlayer extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const { video } = this.props

        flowplayer(this.refs.player, {
            clip: {
                sources: [
                    { type: 'video/mp4', src: video.resource }
                ]
            },
            autoplay: true
            //poster: video.cover_resource
        })
    }

    render() {
        return <div ref="player" className="functional" />
    }
}

FlowPlayer.propTypes = {
    video: React.PropTypes.object.isRequired
}

export default FlowPlayer
