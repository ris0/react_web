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
        const { className, isFeature, video, showTitle, showCaption, showOverlay } = this.props
        const imgSrc = isFeature ? video.resources.feature : video.resources.cover

        return (
            <section className={className}>
                <Link to={`/videos/${video.unique_key}`}>
                    <div className="video-list-item-thumb">
                        <img src={imgSrc} alt={video.title} />
                        { !showOverlay ? <img src="/play_icon_small.png" className="play-icon" /> : null }
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
    isFeature: React.PropTypes.bool,
    showTitle: React.PropTypes.bool,
    showCaption: React.PropTypes.bool,
    showOverlay: React.PropTypes.bool,
    className: React.PropTypes.string
}

VideoThumbnail.defaultProps = {
    isFeature: false,
    showTitle: true,
    showCaption: false,
    showOverlay: false,
    className: 'video-list-item'
}

export default VideoThumbnail
