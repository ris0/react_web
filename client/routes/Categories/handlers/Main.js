import React from 'react';
import VideoThumbnail from '../../../components/VideoThumbnail'
import { fetchCategoryContentIfNeeded } from '../../../actions'
import { connect } from 'react-redux'

// Carousel
import VideoGrid from '../../../components/VideoGrid'

export class Carousel extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const { carousel } = this.refs
        const { videos } = this.props
        this.flickity = new Flickity(carousel, {
            initialIndex: videos.length / 2
        })
    }

    render() {
        const { title, videos } = this.props
        const testVideos = [0,1,2].reduce((acc) => {
            return acc.concat(videos);
        }, [])

        return (
            <div className="carousel">
                <div className="video-list-title">
                    <h1>{title}</h1>
                </div>
                <div ref="carousel">
                    { testVideos.map((video, idx) => <VideoThumbnail video={video} key={`test-${idx}`} />) }
                </div>
            </div>
        )
    }
}

export class CategoriesMain extends React.Component {
    static fetchData(dispatch, params) {
        const { categoryId } = params
        return dispatch(fetchCategoryContentIfNeeded(Number(categoryId)))
    }

    constructor() {
        super();
    }

    componentDidMount() {
        const { params, dispatch } = this.props
        this.constructor.fetchData(dispatch, params)
    }

    componentWillReceiveProps(newProps) {
        const { params, dispatch } = this.props
        if (newProps.params.categoryId !== params.categoryId) {
            this.constructor.fetchData(dispatch, newProps.params)
        }
    }

    render() {
        const { category, videos } = this.props

        return (
            <section className="default-video-list">
                <div className="video-list">
                    { videos.length ? <Carousel title="Series" videos={videos} /> : null }
                </div>
                <div className="video-list">
                    {
                        videos.length ?
                            <div className="video-list-items">
                                { videos.map((video, i) => <VideoThumbnail video={video} key={i} />) }
                            </div>
                            : null
                    }
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { categories, videos } = state
    const category = categories[ownProps.params.categoryId] || {}
    const [_, ...restOfVideos] = category.videos ? category.videos.map((videoId) => videos[videoId]) : []

    return {
        category,
        videos: restOfVideos
    }
}

export default connect(mapStateToProps)(CategoriesMain)
