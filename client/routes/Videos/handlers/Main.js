import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchRelatedContent, fetchVideoIfNeeded, setVideoPageProperties } from '../../../actions'
import ContentDescription from '../components/ContentDescription'
import VideoGrid from '../../../components/VideoGrid'

export class VideosMain extends React.Component {

    static fetchData(dispatch, params, query) {
        const { videoId } = params
        return dispatch(fetchVideoIfNeeded(videoId))
    }

    constructor() {
        super()
        this.onClickShowAll = this.onClickShowAll.bind(this)
    }

    componentDidMount() {
        const { params, dispatch } = this.props
        this.constructor.fetchData(dispatch, params)
            .catch((err) => {
                // TODO redirect to Error page
            })
    }

    componentWillReceiveProps(nextProps) {
        const { params, dispatch } = this.props
        const { params: nextParams } = nextProps

        if (nextParams.videoId !== params.videoId) {
            this.constructor.fetchData(dispatch, nextParams)
        }
    }

    onClickShowAll(showAllText) {
        const { setVideoPageProperties, video } = this.props
        setVideoPageProperties(video.unique_key, { showAllText })
    }

    render() {
        const { relatedContent, setVideoPageProperties, showFullContentDescription, video } = this.props

        if (!video) {
            return null
        }

        const similarContentTitle = <span>similar how to&#8217;s</span>

        return (
            <section className="default-video-list video-page">
                <ContentDescription
                    video={video}
                    onClickShowAll={this.onClickShowAll}
                    showAllText={showFullContentDescription} />
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
    const { videoId } = ownProps.params
    const { pageVideo } = state
    const propertiesByUniqueId = pageVideo.propertiesByUniqueId[videoId] || {}

    return {
        video: videos[videoId],
        relatedContent: [],
        showFullContentDescription: Boolean(propertiesByUniqueId.showAllText)
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign({ dispatch }, bindActionCreators({ setVideoPageProperties }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosMain)
