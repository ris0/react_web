import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'

// for large screens, image layout will be:
//
// [      ][  ][  ]
// [ MAIN ][  ][  ]
//
// smaller screens will drop down to 1-2 columns
function LayoutA(props) {
    const [first, ...rest] = props.items

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

// for large screens, image layout will be:
//
// [  ][      ][  ]
// [  ][ MAIN ][  ]
//
// smaller screens will drop down to 1-2 columns
function LayoutB(props) {
    const [first, ...rest] = props.items

    return (
        <div className="video-list-items">
            <div className="video-list-item-secondary alternate">
                { rest.slice(0, 2).map((video, i) => <VideoThumbnail video={video} key={i} />) }
            </div>
            <div className="video-list-item-primary alternate">
                <VideoThumbnail showCaption={true} video={first} />
            </div>
            <div className="video-list-item-secondary alternate">
                { rest.slice(2).map((video, i) => <VideoThumbnail video={video} key={i} />) }
            </div>
        </div>
    )
}

function VideoSectionPrimary(props) {
    const { videos, useAlternateLayout } = props

    return (
        <section className="video-list">
            {
                useAlternateLayout ?
                    <LayoutB items={videos} /> :
                    <LayoutA items={videos} />
            }
        </section>
    )
}

VideoSectionPrimary.propTypes = {
    videos: React.PropTypes.array
}

VideoSectionPrimary.defaultProps = {
    videos: []
}

export default VideoSectionPrimary
