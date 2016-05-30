import React from 'react'
import { fetchHomeIfNeeded } from '../../../actions'
import VideoThumbnail from '../../../components/VideoThumbnail'
import VideoGrid from '../../../components/VideoGrid'
import VideoSectionPrimary from '../components/VideoSectionPrimary'
import { connect } from 'react-redux'
import { flatten, partitionN } from '../../../utils'

class HomeMain extends React.Component {

    static fetchData(dispatch) {
        return dispatch(fetchHomeIfNeeded())
    }

    constructor() {
        super()
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.constructor.fetchData(dispatch)
            .catch((err) => {
                // TODO redirect to Error page
            })
    }

    render() {
        const { recentVideos } = this.props

        const [
            videoSectionOne = [],
            videoSectionTwo = [],
            ...rest
        ] = partitionN(5, recentVideos)

        const videoSectionThree = flatten(rest)

        return (
            <section className="home-page">
                <VideoSectionPrimary videos={videoSectionOne} />
                <VideoSectionPrimary videos={videoSectionTwo} useAlternateLayout={document.body.clientWidth > 1200 ? true : false} />
                <VideoGrid videos={videoSectionThree} hasMore={false}/>
            </section>
        )
    }
}

function dereferenceVideos(state, name) {
    return state.pageHome[name].map((videoId) => state.videos[videoId])
}

function mapStateToProps(state, ownProps) {
    const recentVideos = dereferenceVideos(state, 'recentVideos')
    return {
        recentVideos
    }
}

export default connect(mapStateToProps)(HomeMain)
