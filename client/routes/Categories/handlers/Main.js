import React from 'react';
import VideoThumbnail from '../../../components/VideoThumbnail'
import Carousel from '../../../components/Carousel'
import { fetchCategoryContentIfNeeded } from '../../../actions'
import { connect } from 'react-redux'

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
            <section className="category-page default-video-list">
                {/* TODO series functionality
                <div className="video-list">
                    { videos.length ? <Carousel title="Series" showDots={false} videos={videos} /> : null }
                </div>
                */}
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

    return {
        category,
        videos: category.recentIds ? category.recentIds.map((videoId) => videos[videoId]) : []
    }
}

export default connect(mapStateToProps)(CategoriesMain)
