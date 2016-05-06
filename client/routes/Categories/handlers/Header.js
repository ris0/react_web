import React from 'react'
import VideoHeader from '../../../components/VideoHeader'
import { connect } from 'react-redux'

export class CategoriesHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { category, video } = this.props
        if (!video) {
            //return null
        }

        return <VideoHeader title={category.name} video={video}/>
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {}
    // TODO video from categoryContent

    return {
        category: state.categories[ownProps.params.categoryId],
        video: null
    }
}

export default connect(mapStateToProps, {})(CategoriesHeader)
