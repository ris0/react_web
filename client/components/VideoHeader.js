import React from 'react'

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
        const isLoaded = Boolean(currentVideoStatus && currentVideoStatus.unique_key)

        // TODO show placeholder image before user hits play
        return (
            <div className="video-header">
                <div className="video-main">
                    <div className="video">
                        { video && isLoaded ?
                                <video src={video.resource} controls="controls" autoPlay={true} /> : null }
                        {
                            video && !isLoaded ?
                                <div className="video-image">
                                    <div className="video-description">
                                        <h1>Header Title Thing&nbsp;<i className="fa fa-inverse fa-play-circle"></i></h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    <div className="play-overlay" onClick={this.loadVideo.bind(this, video)}>
                                        <i className="fa fa-inverse fa-play-circle" onClick={this.loadVideo.bind(this, video)} />
                                    </div>
                                    <img src={video.cover_resource} alt="" />
                                </div> :
                                null
                        }

                        {
                        /*
                        TODO figure out how to float text over video... obviously I can
                        absolute position this stuff, but that seems hacky... can this be done
                        via whatever video player we use?
                        */}
                    </div>
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
