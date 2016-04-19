import React from 'react'
import { Link } from 'react-router'

class VideoThumbnail extends React.Component {
    constructor() {
        super()
    }

    clipCaption(caption = '') {
        return `${caption.slice(0, 140)}...`
    }

    render() {
        const { video, showTitle, showCaption } = this.props

        return (
            <section className="video-list-item">
                <Link to={`/videos/${video.unique_key}`}>
                    <div className="video-list-item-thumb">
                        <img src={video.cover_resource} alt={video.title} />
                    </div>
                    <div className="content-description">
                        { showTitle ? <h1>{video.title}</h1> : null }
                        { showCaption ? <p>{this.clipCaption(video.caption)}</p> : null }
                    </div>
                </Link>
            </section>
        )
    }
}

VideoThumbnail.propTypes = {
    showTitle: React.PropTypes.bool,
    showCaption: React.PropTypes.bool
}

VideoThumbnail.defaultProps = {
    showTitle: true,
    showCaption: false
}

export default VideoThumbnail
