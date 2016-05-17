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
    const imgUrl = "https://s3.amazonaws.com/staging.theknowsy.com/content/i/e5/bd/30/4b/20/90/e5bd304b2090db509f7a5ae6f272702755d4b91a.jpg"

    return (
        <div className="carousel">
            <div className="video-list-title">
                <h1>{title}</h1>
            </div>
            <Slider
                className="nope-video-list-items"
                dots={true}
                infinite={true}
                slidesToShow={4}
                slidesToScroll={4}
                speed={500}>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    <div><img src={imgUrl} alt="" /></div>
                    {/* videos.map((video, i) => <VideoThumbnail video={video} key={`test-i`} />) */}
            </Slider>
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
                <div className="video-list">
                    { videos.length ? <Carousel title="Series... (work in progress)" videos={videos} /> : null }
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
