import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'
import { connect } from 'react-redux'

class HomeHeader extends React.Component {

    constructor() {
        super()
    }

    render() {
        const { video } = this.props
        if (!video) {
            return null
        }

        return (
            <div className="home-page home-page-main">
                <VideoThumbnail video={video} showTitle={false} showOverlay={true} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    // TODO use featuredVideo, but we don't have any for now...
    const [featuredVideo] = state.pageHome.featuredVideos

    return {
        video: state.videos[featuredVideo]
    }
}

export default connect(mapStateToProps)(HomeHeader)
