import React from 'react'
import config from 'config'
const { FLOWPLAYER_KEY } = config

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
            poster: video.resources.feature,
            key: FLOWPLAYER_KEY
        })

    }

    render() {
        return <div ref="player" className="functional video-player"/>
    }
}

FlowPlayer.propTypes = {
    video: React.PropTypes.object.isRequired
}

export default FlowPlayer
