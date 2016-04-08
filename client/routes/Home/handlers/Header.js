import React from 'react'
import VideoHeader from '../../../components/VideoHeader'
import { connect } from 'react-redux'

class HomeHeader extends React.Component {

    static fetchData(dispatch, params, query) {
    }

    constructor() {
        super()
    }

    componentDidMount() {
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
    // TODO use featuredVideo, but we don't have any for now...
    //const [featuredVideo] = state.pageHome.featuredVideos
    const [featuredVideo] = state.pageHome.recentVideos

    return {
        video: state.videos[featuredVideo]
    }
}

export default connect(mapStateToProps, {})(HomeHeader)
