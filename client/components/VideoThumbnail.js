import React from 'react'
import { Link } from 'react-router'
import { clipText } from '../utils'

function TextOverlay(props) {
    const { title, description } = props

    return (
        <div className="overlay">
            <h1>{title}</h1>
            <p>{'We need to add a shorter sentence-long caption here'}</p>
            <img src="/play_icon.png" className="play-icon" />
        </div>
    )
}

class VideoThumbnail extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { video, showTitle, showCaption, showOverlay } = this.props

        return (
            <section className="video-list-item">
                <Link to={`/videos/${video.unique_key}`}>
                    <div className="video-list-item-thumb">
                        <img src={video.cover_resource} alt={video.title} />
                        { !showOverlay ? <img src="/play_icon.png" className="play-icon" /> : null }
                        { showOverlay ? <TextOverlay title={video.title} description={video.shortCaption} /> : null }
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
    showCaption: React.PropTypes.bool,
    showOverlay: React.PropTypes.bool
}

VideoThumbnail.defaultProps = {
    showTitle: true,
    showCaption: false,
    showOverlay: false
}

export default VideoThumbnail
