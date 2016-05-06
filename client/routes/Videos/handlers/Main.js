import React from 'react'
import { connect } from 'react-redux'
import { fetchRelatedContent, fetchVideoIfNeeded } from '../../../actions'
import ContentDescription from '../components/ContentDescription'
import VideoGrid from '../../../components/VideoGrid'

export class VideosMain extends React.Component {

    static fetchData(dispatch, params, query) {
        const { videoId } = params
        return dispatch(fetchVideoIfNeeded(videoId))
    }

    constructor() {
        super()
    }

    componentDidMount() {
        const { params, dispatch } = this.props
        VideosMain.fetchData(dispatch, params)
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

        const similarContentTitle = <span>similar to <em>{video.title}</em></span>

        return (
            <section className="default-video-list video-page">
                {/*
                    <div className="section video-user-controls">
                    <div>
                    <a href="#"><i className="fa fa-clock-o"/>&nbsp;watch later</a>
                    <a href="#"><i className="fa fa-plus" />&nbsp;add to queue</a>
                    <a href="#"><i className="fa fa-heart-o" /></a>
                    </div>
                    </div>
                */}
                { <ContentDescription caption={video.caption} title={video.title} /> }
                {
                    video.similar && video.similar.length ?
                        <VideoGrid title={similarContentTitle} videos={video.similar} hasMore={false} />
                        : null
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {}

    return {
        video: ownProps.params.videoId ? videos[ownProps.params.videoId] : null,
        relatedContent: [] //state.pageVideo.relatedContent
    }
}

export default connect(mapStateToProps)(VideosMain)
