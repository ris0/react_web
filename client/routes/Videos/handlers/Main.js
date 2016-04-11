import React from 'react'
import { connect } from 'react-redux'
import { fetchRelatedContent, fetchVideoIfNeeded } from '../../../actions'
import ContentDescription from '../components/ContentDescription'
import VideoGrid from '../../../components/VideoGrid'

class VideosMain extends React.Component {

    static fetchData(dispatch, params, query) {
        const { videoId } = params
        return Promise.all([
            dispatch(fetchVideoIfNeeded(videoId)),
            dispatch(fetchRelatedContent())
        ])
    }

    constructor() {
        super()
    }

    componentDidMount() {
        const { params, dispatch } = this.props
        VideosMain.fetchData(this.props.dispatch, params)
            .catch((err) => {
                // TODO redirect to Error page
            })
    }

    componentWillReceiveProps(nextProps) {
        const { params, dispatch } = this.props
        const { params: nextParams } = nextProps

        if (nextParams.videoId !== params.videoId) {
            VideosMain.fetchData(dispatch, nextParams)
        }
    }

    render() {
        const { relatedContent, video } = this.props
        if (!video) {
            return null
        }

        return (
            <section className="video-page">
                {/*
                    <div className="section video-user-controls">
                    <div>
                    <a href="#"><i className="fa fa-clock-o"/>&nbsp;watch later</a>
                    <a href="#"><i className="fa fa-plus" />&nbsp;add to queue</a>
                    <a href="#"><i className="fa fa-heart-o" /></a>
                    </div>
                    </div>
                */}
                { video ? <ContentDescription caption={video.caption} title={video.title} /> : null }
                {
                    relatedContent.length ?
                        <div>
                            <VideoGrid title="Sample Category" videos={relatedContent} hasMore={false} />
                            <VideoGrid title="Some Title" videos={relatedContent} hasMore={false} />
                        </div> : null
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {}
    // TODO synchronize this with Video Header somehow

    return {
        video: ownProps.params.videoId ? videos[ownProps.params.videoId] : null,
        relatedContent: state.pageVideo.relatedContent
    }
}

export default connect(mapStateToProps)(VideosMain)
