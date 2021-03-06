import React from 'react'
import VideoPlayer from './FlowPlayer'

class VideoHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoaded: true // TODO shoudl this be true by default??
        }
    }

    componentWillReceiveProps(newProps) {
        const { video } = this.props
        // FIXME hacky bullshit to work around issues with flowplayer loading
        if (video && video.unique_key !== newProps.video.unique_key) {
            this.setState({ isLoaded: false },
                          () => this.setState({ isLoaded: true }))
        }
    }

    render() {
        const { title, video, children, className } = this.props
        const { isLoaded } = this.state

        return (
            <div className={`video-header ${className}`}>
                { title ? <h1>{title}</h1> : null }
                <div className="video-main">
                    { isLoaded && video ? <VideoPlayer video={video} /> : null }
                    { children }
                </div>
            </div>
        )
    }
}

VideoHeader.propTypes = {
    title: React.PropTypes.string,
    video: React.PropTypes.object,
    className: React.PropTypes.string
}

VideoHeader.defaultProps = {
    className: ''
}

export default VideoHeader
