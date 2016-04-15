import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'

export default function VideoSectionPrimary(props) {
    const [first, ...rest] = props.videos

    return (
        <div className="video-list-items">
            <div className="video-list-item-primary">
                <VideoThumbnail showCaption={true} video={first} />
            </div>
            <div className="video-list-item-secondary">
                { rest.map((video, i) => <VideoThumbnail video={video} key={i} />) }
            </div>
        </div>
    )
}

