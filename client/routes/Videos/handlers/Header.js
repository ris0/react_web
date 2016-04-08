import React from 'react'
import VideoHeader from '../../../components/VideoHeader'
import { connect } from 'react-redux'

class VideosHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { video } = this.props
        if (!video) {
            return null
        }

        return <VideoHeader video={video}/>
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {}
    // TODO synchronize this with Video Main somehow

    return {
        video: ownProps.params.videoId ? videos[ownProps.params.videoId] : null,
    }
}

export default connect(mapStateToProps, {})(VideosHeader)
