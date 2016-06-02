import React from 'react'
import VideoHeader from '../../../components/VideoHeader'
import SocialSidebar from '../components/SocialSidebar'
import { connect } from 'react-redux'

export class VideosHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { socialShareIcons, video } = this.props
        if (!video) {
            return null
        }

        return (
            <VideoHeader video={video} className="page-header video-page">
                <SocialSidebar icons={socialShareIcons} />
            </VideoHeader>
        )
    }
}

VideosHeader.propTypes = {
    socialShareIcons: React.PropTypes.array,
    video: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {}

    return {
        socialShareIcons: state.app.socialShareIcons,
        video: videos[ownProps.params.videoId]
    }
}

export default connect(mapStateToProps, {})(VideosHeader)
