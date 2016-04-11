import React from 'react'
import VideoHeader from '../../../components/VideoHeader'
import { setCurrentVideoStatus } from '../../../actions'
import { connect } from 'react-redux'

class HomeHeader extends React.Component {

    constructor() {
        super()
    }

    render() {
        const { video, currentVideoStatus, setCurrentVideoStatus } = this.props
        if (!video) {
            return null
        }

        return <VideoHeader currentVideoStatus={currentVideoStatus} setCurrentVideoStatus={setCurrentVideoStatus} video={video}/>
    }
}

function mapStateToProps(state, ownProps) {
    // TODO use featuredVideo, but we don't have any for now...
    //const [featuredVideo] = state.pageHome.featuredVideos
    const [featuredVideo] = state.pageHome.recentVideos

    return {
        video: state.videos[featuredVideo],
        currentVideoStatus: state.currentVideoData
    }
}

export default connect(mapStateToProps, { setCurrentVideoStatus })(HomeHeader)
