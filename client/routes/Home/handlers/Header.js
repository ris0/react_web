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
                <VideoThumbnail video={Object.assign({}, video, { cover_resource: '/HomeHead_DoubleDutchBraid.jpg' })} showTitle={false} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    // TODO use featuredVideo, but we don't have any for now...
    //const [featuredVideo] = state.pageHome.featuredVideos
    const [featuredVideo] = state.pageHome.recentVideos

    return {
        video: state.videos[featuredVideo]
    }
}

export default connect(mapStateToProps)(HomeHeader)
