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
            poster: video.cover_resource
            //splash: true,
            //poster: 'https://lh3.googleusercontent.com/_jW-N0BYAMIaT6Q9_MPJd0i8Cz_IzNVMNLmvs3PC2IhiGih_e4CYQsf6u892imfZzkrSuQ=w2560-h1664'
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
