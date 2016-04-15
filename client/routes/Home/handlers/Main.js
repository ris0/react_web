import React from 'react'
import { fetchHomeIfNeeded } from '../../../actions'
import VideoThumbnail from '../../../components/VideoThumbnail'
import VideoSectionPrimary from '../components/VideoSectionPrimary'
import { connect } from 'react-redux'

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

        const videoSectionOne = recentVideos.slice(0, 5)
        const videoSectionTwo = recentVideos.slice(5, 10)
        const videoSectionThree = recentVideos.slice(10)

        return (
            <section className="home-page">
                <div className="section video-list">
                    <VideoSectionPrimary videos={videoSectionOne}/>
                    <VideoSectionPrimary videos={videoSectionTwo}/>
                    <div className="video-list-items">
                        {
                            videoSectionThree.map((video, i) => <VideoThumbnail video={video} key={i} />)
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
    return {
        featuredVideos: dereferenceVideos(state, 'featuredVideos'),
        recentVideos: dereferenceVideos(state, 'recentVideos')
    }
}

export default connect(mapStateToProps)(HomeMain)
