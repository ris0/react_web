import React from 'react'
import { Link } from 'react-router'

class VideoThumbnail extends React.Component {
    constructor() {
        super()
    }

    clipCaption(caption = '') {
        return `${caption.slice(0, 240)}...`
    }

    render() {
        const { video, showCaption } = this.props

        return (
            <section className="video-list-item">
                <Link to={`/videos/${video.unique_key}`}>
                    <div className="video-list-item-thumb">
                        <img src={video.cover_resource} alt={video.title} />
                    </div>
                    <div className="content-description">
                        {/* TODO what is this?
                            <h1>CATEGORY / COLLECTION</h1>
                        */}
                        <h1>{video.title}</h1>
                        { showCaption ? <p>{this.clipCaption(video.caption)}</p> : null }
                    </div>
                </Link>
            </section>
        )
    }
}
export default VideoThumbnail
