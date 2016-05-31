import React from 'react';
import VideoThumbnail from './VideoThumbnail'

class Carousel extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const { carousel } = this.refs
        const { videos, showArrows, showDots } = this.props
        this.flickity = new Flickity(carousel, {
            initialIndex: Math.floor(videos.length / 2),
            pageDots: showDots,
            prevNextButtons: showArrows,
            cellAlign: 'left', // TODO REMOVE/toggle via prop?
            wrapAround: true
        })
    }

    componentWillUnmount() {
        this.flickity && this.flickity.destroy()
    }

    render() {
        const { title, children, videos } = this.props

        return (
            <div className="carousel">
                {
                    title ?
                        <div className="video-list-title">
                            <h1>{title}</h1>
                        </div> : null
                }
                <div ref="carousel">
                    { 
                        children ?
                            children :
                            videos.map((video, idx) => <VideoThumbnail video={video} key={video.unique_key} />) 
                    }
                </div>
            </div>
        )
    }
}

Carousel.propTypes = {
    videos: React.PropTypes.array,
    showDots: React.PropTypes.bool,
    showArrows: React.PropTypes.bool
}

Carousel.defaultProps = {
    videos: [],
    showDots: true,
    showArrows: true
}

export default Carousel
