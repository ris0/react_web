import React from 'react'
import { Link } from 'react-router'
import { clipText } from '../utils'

class VideoThumbnail extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { video, showTitle, showCaption } = this.props

        return (
            <section className="video-list-item">
                <Link to={`/videos/${video.unique_key}`}>
                    <div className="video-list-item-thumb">
                        <img src={video.cover_resource} alt={video.title} />
                        <img src="/play_icon.png" className="play-icon" />
                    </div>
                    <div className="content-description">
                        { showTitle ? <h1>{video.title}</h1> : null }
                        { showCaption ? <p>{clipText(video.caption)}</p> : null }
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
