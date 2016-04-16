import React from 'react'
import VideoThumbnail from './VideoThumbnail'

// TODO do I really need this component?
class VideoGrid extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { title, hasMore, videos } = this.props

        function take(n, coll) {
            let results = [];
            for (let i = 0; i < n; i++) {
                results.push(coll[i])
            }
            return results
        } 

        return (
            <section className="video-list">
                {
                    title ?
                        <div className="video-list-title">
                            <h1>{title}&nbsp;</h1>
                            {/*
                                <a><i>See All</i></a>
                            */}
                        </div> : null
                }
                <div className="video-list-items">
                    {
                        take(8, videos).map((video, i) => <VideoThumbnail video={video} key={i} />)
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

export default VideoGrid
