import React from 'react'

class VideoHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { video } = this.props
        const isPlaying = false;
        if (!video) {
            return null
        }

        // TODO show placeholder image before user hits play
        return (
            <div className="video-header">
                <div className="video-main">
                    <div className="video">
                        { video && isPlaying ?
                                <video src={video.resource} controls="controls"></video> : null }
                        {
                            video && !isPlaying ?
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
                                    <div className="play-overlay">
                                        <i className="fa fa-inverse fa-play-circle"></i>
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

export default VideoHeader
