import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'

function VideoSectionPrimary(props) {
    const [first, ...rest] = props.videos

    return (
        <div className="video-list-items">
            {
                first ?
                    <div className="video-list-item-primary">
                        <VideoThumbnail showCaption={true} video={first} />
                    </div> : null
            }
            <div className="video-list-item-secondary">
                { rest.map((video, i) => <VideoThumbnail video={video} key={i} />) }
            </div>
        </div>
    )
}

VideoSectionPrimary.propTypes = {
    videos: React.PropTypes.array
}

VideoSectionPrimary.defaultProps = {
    videos: []
}

export default VideoSectionPrimary
