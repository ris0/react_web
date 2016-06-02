import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'
import Carousel from '../../../components/Carousel'
import { connect } from 'react-redux'

export class HomeHeader extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoaded: false
        }
        this.onLoaded = this.onLoaded.bind(this)
    }

    onLoaded() {
        // Hacky junk to ensure that at least one image has been
        // fully loaded (and therefore availble to Carousel) for
        // dimension-calculation purposes. We only really need one
        // to be loaded. see `components/Carousel.js` for more
        // details
        if (!this.state.isLoaded) {
            this.setState({
                isLoaded: true
            })
        }
    }

    render() {
        const { videos } = this.props

        return (
            <div className="page-header home-page home-page-main">
                {
                    videos && videos.length ?
                        <Carousel autoPlay={true} showArrows={false} isLoaded={this.state.isLoaded}>
                        {
                            videos.map((video, i) =>
                                <VideoThumbnail
                                    key={video.unique_key + i}
                                    onLoad={this.onLoaded}
                                    video={video}
                                    isFeature={true}
                                    showTitle={false}
                                    showOverlay={true} />)
                        }
                        </Carousel> : null
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { featuredVideos } = state.pageHome

    return {
        videos: featuredVideos.map((videoId => state.videos[videoId]))
    }
}

export default connect(mapStateToProps)(HomeHeader)
