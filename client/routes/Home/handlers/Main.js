import React from 'react'
import { fetchHomeIfNeeded } from '../../../actions'
import VideoThumbnail from '../../../components/VideoThumbnail'
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
            return <div>Loading...</div>
        }

        function range(n, fn) {
            let arr = []
            for (let i = 0; i < n; i++) {
                arr.push(fn())
            }
            return arr
        }

        function chooseRandom() {
            const randIndex = Math.floor(Math.random() * 4)
            return recentVideos[randIndex]
        }

        return (
            <section className="home-page">
                <div className="section video-list">
                    {
                        [0, 1].map((i) => {

                            return (
                                <div className="video-list-items" key={i}>
                                    <div className="video-list-item-primary">
                                        {
                                            (function() {
                                                const video = chooseRandom()
                                                return <VideoThumbnail showCaption={true} video={video} />
                                            })()
                                        }
                                    </div>
                                    <div className="video-list-item-secondary">
                                        {
                                            range(4, chooseRandom).map((video, i) => <VideoThumbnail video={video} key={i} />)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="video-list-items">
                        {
                            range(8, chooseRandom).map((video, i) => <VideoThumbnail video={video} key={i} />)
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
