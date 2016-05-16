import React from 'react'
import VideoThumbnail from './VideoThumbnail'

// TODO either get rid of this component, or make it a better generic video list that handles
// different types of video lists...
class VideoGrid extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { title, hasMore, videos } = this.props

        return (
            <section className="video-list">
                {
                    title ?
                        <div className="video-list-title">
                            <h1>{title}</h1>
                        </div> : null
                }
                <div className="video-list-items">
                    {
                        videos.map((video, i) => <VideoThumbnail video={video} key={i} />)
                    }
                </div>
                {
                    hasMore ?
                        <div className="video-list-footer">
                            <a><i>Load More</i></a>
                        </div> : null
                }
            </section>
        )
    }
}

VideoGrid.propTypes = {
    videos: React.PropTypes.array
}

VideoGrid.defaultProps = {
    videos: []
}

export default VideoGrid
