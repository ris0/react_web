import React from 'react'
import FlowPlayer from './FlowPlayer'

class VideoHeader extends React.Component {
    constructor() {
        super()
    }

    componentWillUnmount() {
        const { setCurrentVideoStatus } = this.props
        setCurrentVideoStatus(null)
    }

    loadVideo(video) {
        const { setCurrentVideoStatus } = this.props
        setCurrentVideoStatus(video)
    }

    render() {
        const { video, currentVideoStatus, setCurrentVideoStatus } = this.props
        //const isLoaded = Boolean(currentVideoStatus && currentVideoStatus.unique_key)
        const isLoaded = true;

        return (
            <div className="video-header">
                <div className="video-main">
                    <FlowPlayer video={video} />
                    {
                        false ?
                            <div className="video-image">
                                <div className="video-description">
                                    <h1>Header Title Thing&nbsp;<i className="fa fa-inverse fa-play-circle"></i></h1>
                                    <p>{video.caption}</p>
                                </div>
                                <div className="play-overlay" onClick={this.loadVideo.bind(this, video)}>
                                    <i className="fa fa-inverse fa-play-circle" onClick={this.loadVideo.bind(this, video)} />
                                </div>
                                <img src={'/tequila_sunrise.jpg'/*video.cover_resource*/} alt="" />
                            </div> :
                            null
                    }
                </div>
            </div>
        )
    }
}

VideoHeader.propTypes = {
    video: React.PropTypes.object,
    currentVideoStatus: React.PropTypes.object,
    setCurrentVideoStatus: React.PropTypes.func,
}

VideoHeader.defaultProps = {
    video: null,
    currentVideoStatus: null,
    setCurrentVideoStatus: () => {}
}

export default VideoHeader
