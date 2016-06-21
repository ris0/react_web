import React from 'react'
import { Link } from 'react-router'
import { clipText } from '../utils'
import handleResizeContainer from './handleResizeContainer'
import VideoThumbnailImage from './VideoThumbnailImage'

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
        const {
            className,
            onLoad,
            isFeature,
            showCaption,
            showOverlay,
            showTitle,
            video,
            windowWidth
        } = this.props

        if (!video) {
            return null
        }

        return (
            <section className={className}>
                <Link to={`/videos/${video.unique_key}`}>
                    <div className="video-list-item-thumb">
                        <VideoThumbnailImage isFeature={isFeature} onLoad={onLoad} windowWidth={windowWidth} video={video} />
                        { !showOverlay ? <img src="/play_icon_small.png" className="play-icon" /> : null }
                        { showOverlay ? <TextOverlay title={video.titles.main} description={video.shortCaption} /> : null }
                    </div>
                    <div className="content-description">
                        { showTitle ? <h1>{video.titles.main}</h1> : null }
                        { showCaption ? <p>{clipText(video.caption)}</p> : null }
                    </div>
                </Link>
            </section>
        )
    }
}

VideoThumbnail.propTypes = {
    className: React.PropTypes.string,
    isFeature: React.PropTypes.bool,
    onLoad: React.PropTypes.func,
    showCaption: React.PropTypes.bool,
    showOverlay: React.PropTypes.bool,
    showTitle: React.PropTypes.bool,
    video: React.PropTypes.object
}

VideoThumbnail.defaultProps = {
    className: 'video-list-item',
    isFeature: false,
    onLoad: () => {},
    showCaption: false,
    showOverlay: false,
    showTitle: true
}

export default handleResizeContainer(VideoThumbnail)
