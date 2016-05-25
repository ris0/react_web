import React from 'react';
import VideoThumbnail from './VideoThumbnail'

class Carousel extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const { carousel } = this.refs
        const { videos, showDots } = this.props
        this.flickity = new Flickity(carousel, {
            initialIndex: Math.floor(videos.length / 2),
            pageDots: showDots
        })
    }

    componentWillUnmount() {
        this.flickity && this.flickity.destroy()
    }

    render() {
        const { title, videos } = this.props

        return (
            <div className="carousel">
                <div className="video-list-title">
                    <h1>{title}</h1>
                </div>
                <div ref="carousel">
                    { videos.map((video, idx) => <VideoThumbnail video={video} key={video.unique_key} />) }
                </div>
            </div>
        )
    }
}

Carousel.propTypes = {
    videos: React.PropTypes.array,
    showDots: React.PropTypes.bool
}

Carousel.defaultProps = {
    videos: [],
    showDots: true
}

export default Carousel
