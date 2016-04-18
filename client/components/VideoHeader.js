import React from 'react'
import FlowPlayer from './FlowPlayer'
import SocialButtons from './SocialButtons'

function SocialSidebar(props) {
    return (
        <div className="social-sidebar">
            <SocialButtons />
        </div>
    )
}

class VideoHeader extends React.Component {
    constructor() {
        super()
    }

    componentWillUnmount() {
        const { setCurrentVideoStatus } = this.props
        setCurrentVideoStatus(null)
    }

    loadVideo(video) {
        const { setCurrentVideoStatus } = this.props
        setCurrentVideoStatus(video)
    }

    render() {
        const { title, video, currentVideoStatus, setCurrentVideoStatus } = this.props
        //const isLoaded = Boolean(currentVideoStatus && currentVideoStatus.unique_key)
        const isLoaded = true;

        // TODO title to HEADER font...
        return (
            <div className="video-header">
                { title ? <h1>{title}</h1> : null }
                <div className="video-main">
                    { video ? <FlowPlayer video={video} /> : null }
                    { video ? <SocialSidebar /> : null }
                </div>
            </div>
        )
    }
}

VideoHeader.propTypes = {
    title: React.PropTypes.string,
    video: React.PropTypes.object,
    currentVideoStatus: React.PropTypes.object,
    setCurrentVideoStatus: React.PropTypes.func,
}

VideoHeader.defaultProps = {
    title: null,
    video: null,
    currentVideoStatus: null,
    setCurrentVideoStatus: () => {}
}

export default VideoHeader
