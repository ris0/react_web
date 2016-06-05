import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'
import { connect } from 'react-redux'

const first = (items = []) => {
    if (items && items.length) {
        return items[0]
    }
}

export class CategoriesHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { category, videos } = this.props

        // FIXME FOR NOW
        const [video] = videos
        if (!video) {
            return null
        }


        return (
            <div className="page-header category-page">
                <div className="video-list-title">
                    <h1>{category.name}</h1>
                </div>
                <VideoThumbnail video={video} isFeature={true} showTitle={false} showOverlay={true} />
            </div>
        )
    }
}

CategoriesHeader.propTypes = {
    category: React.PropTypes.object,
    videos: React.PropTypes.array
}

CategoriesHeader.defaultProps = {
    category: {},
    videos: []
}

function mapStateToProps(state, ownProps) {
    const { categories, videos } = state
    const category = categories[ownProps.params.categoryId] || {}

    return {
        category,
        videos: category.featuredIds ? category.featuredIds.map((videoId) => videos[videoId]) : []
    }
}

export default connect(mapStateToProps, {})(CategoriesHeader)
