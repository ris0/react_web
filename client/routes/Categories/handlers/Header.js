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
        const { category, video } = this.props
        if (!video) {
            return null
        }

        return (
            <div className="category-page">
                <VideoThumbnail video={video} showTitle={false} showOverlay={true} />
            </div>
        )
    }
}

CategoriesHeader.propTypes = {
    category: React.PropTypes.object,
    video: React.PropTypes.object
}

CategoriesHeader.defaultProps = {
    category: {}
}

function mapStateToProps(state, ownProps) {
    const { categories, videos } = state
    const category = categories[ownProps.params.categoryId] || {}
    const video = category.videos.map((videoId) => videos[videoId])

    return {
        category,
        video: first(video)
    }
}

export default connect(mapStateToProps, {})(CategoriesHeader)
