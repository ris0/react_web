import React from 'react'
import { fetchHomeIfNeeded } from '../../../actions'
import VideoThumbnail from '../../../components/VideoThumbnail'
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
        HomeMain.fetchData(dispatch)
            .catch((err) => {
                // TODO redirect to Error page
            })
    }

    render() {
        const { featuredVideos, recentVideos } = this.props

        if (!recentVideos.length) {
            // TODO loading spinner instead
            return <div>Loading...</div>
        }

        const [
            videoSectionOne = [],
            videoSectionTwo = [],
            ...videoSectionThree
        ] = partitionN(5, recentVideos)

        return (
            <section className="home-page">
                <div className="section video-list">
                    <VideoSectionPrimary videos={videoSectionOne}/>
                    <VideoSectionPrimary videos={videoSectionTwo}/>
                    <div className="video-list-items">
                        {
                            flatten(videoSectionThree).map((video, i) => <VideoThumbnail video={video} key={i} />)
                        }
                    </div>
                </div>
            </section>
        )
    }
}

function dereferenceVideos(state, name) {
    return state.pageHome[name].map((videoId) => state.videos[videoId])
}

function mapStateToProps(state, ownProps) {
    const [_, ...recentVideos] = dereferenceVideos(state, 'recentVideos')
    return {
        featuredVideos: dereferenceVideos(state, 'featuredVideos'),
        recentVideos
    }
}

export default connect(mapStateToProps)(HomeMain)
