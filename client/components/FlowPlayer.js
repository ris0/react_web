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
                    { type: 'video/mp4', src: video.resources.video }
                ]
            },
            autoplay: true,
            poster: video.resources.feature
        })
    }

    render() {
        return <div ref="player" className="functional video-player" />
    }
}

FlowPlayer.propTypes = {
    video: React.PropTypes.object.isRequired
}

export default FlowPlayer
