import React from 'react'
import VideoHeader from '../../../components/VideoHeader'
import SocialButtons from '../../../components/SocialButtons'
import { connect } from 'react-redux'

function SocialSidebar(props) {
    return (
        <div className="social-sidebar">
            <SocialButtons />
        </div>
    )
}

export class VideosHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { video } = this.props
        if (!video) {
            return null
        }

        return (
            <VideoHeader video={video} className="page-header video-page">
                <SocialSidebar />
            </VideoHeader>
        )
    }
}

VideosHeader.propTypes = {
    video: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {}

    return {
        video: videos[ownProps.params.videoId]
    }
}

export default connect(mapStateToProps, {})(VideosHeader)
