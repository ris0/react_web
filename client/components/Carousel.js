import React from 'react';

class Carousel extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const { carousel } = this.refs
        const { autoPlay, children: carouselItems, showArrows, showDots } = this.props
        this.flickity = new Flickity(carousel, {
            autoPlay,
            pageDots: showDots,
            prevNextButtons: showArrows,
            cellAlign: 'left', // TODO REMOVE/toggle via prop?
            wrapAround: true,
            touchVerticalScroll: false
        })
    }

    componentWillUnmount() {
        this.flickity && this.flickity.destroy()
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.isLoaded && newProps.isLoaded) {
            // Hack to ensure that Flickity carousel *always* renders properly.
            // There seems to be an issue with Flickity (or rather with the interplay
            // between Flickity and react/single page apps in general) where if images
            // in a carousel load slowly, Flickity can't figure out the dimensions that
            // the carousel should be, so you end up with a collapsed carousel with a 0px
            // height. calling the `resize` method on the flickity instance fixes this,
            // but we have to wait until at least one of the images has been loaded. we
            // rely on the consuming component to set the `isLoaded` flag when at least
            // one of the images has been loaded. Here, if `isLoaded` was previously
            // false and the has been changed to true, we re-jigger our carousel via
            // a call to `resize`
            this.flickity && this.flickity.resize()
        }
    }

    render() {
        const { title, children: carouselItems } = this.props

        return (
            <div className="carousel">
                {
                    title ?
                        <div className="video-list-title">
                            <h1>{title}</h1>
                        </div> : null
                }
                <div ref="carousel">
                    { carouselItems }
                </div>
            </div>
        )
    }
}

Carousel.propTypes = {
    autoPlay: React.PropTypes.bool,
    videos: React.PropTypes.array,
    showDots: React.PropTypes.bool,
    showArrows: React.PropTypes.bool
}

Carousel.defaultProps = {
    autoPlay: false,
    videos: [],
    showDots: true,
    showArrows: true
}

export default Carousel
