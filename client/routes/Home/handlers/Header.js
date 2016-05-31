import React from 'react'
import VideoThumbnail from '../../../components/VideoThumbnail'
import Carousel from '../../../components/Carousel'
import { connect } from 'react-redux'

export class HomeHeader extends React.Component {

    constructor() {
        super()
    }

    render() {
        const { videos } = this.props

        return (
            <div className="page-header home-page home-page-main">
                {
                    videos ?
                        <Carousel showArrows={false}>
                        {
                            videos.map((video) => {
                                return <VideoThumbnail
                                            key={video.unique_key}
                                            video={video}
                                            isFeature={true}
                                            showTitle={false}
                                            showOverlay={true} />
                            })
                        }
                        </Carousel> : null
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { featuredVideos } = state.pageHome

    return {
        videos: featuredVideos.map((videoId => state.videos[videoId]))
    }
}

export default connect(mapStateToProps)(HomeHeader)
