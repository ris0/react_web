import React from 'react'
import VideoThumbnail from './VideoThumbnail'

// TODO do I really need this component?
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
                            {/*
                                <a><i>See All</i></a>
                            */}
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

VideoGrid.propType = {
    videos: React.PropTypes.array
}

VideoGrid.defaultProps = {
    videos: []
}

export default VideoGrid
