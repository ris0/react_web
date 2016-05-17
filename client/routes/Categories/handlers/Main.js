import React from 'react';
import VideoThumbnail from '../../../components/VideoThumbnail'
import { fetchCategoryContentIfNeeded } from '../../../actions'
import { connect } from 'react-redux'

// Carousel
import VideoGrid from '../../../components/VideoGrid'
import Slider from 'react-slick'

            //<VideoGrid title={title} videos={videos} hasMore={false} />
function Carousel(props) {
    const { title, videos } = props

    return (
        <div className="carousel">
            <div className="video-list-title">
                <h1>{title}</h1>
            </div>
            <p>...soon</p>
            { false ?
                <Slider
                className="video-list-items"
                dots={true}
                infinite={true}
                slidesToShow={3}
                slidesToScroll={3}
                speed={500}>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                <div><h3>Test</h3></div>
                {/* videos.map((video, i) => <VideoThumbnail video={video} key={i} />) */}
                </Slider> : null
            }
        </div>
    )
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
                { videos.length ? <Carousel title="Series" videos={videos} /> : null }
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
