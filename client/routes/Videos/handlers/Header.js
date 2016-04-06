import React from 'react';
import { connect } from 'react-redux';

class VideosHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { video } = this.props;
        if (!video) {
            return null;
        }

        return (
            <div className="video-page">
                <div className="video-main">
                    <div className="video">
                        { video ?
                                <video src={video.resource} controls="controls"></video> : null }
                        {/*
                        TODO figure out how to float text over video... obviously I can
                        absolute position this stuff, but that seems hacky... can this be done
                        via whatever video player we use?
                        <div>HEALTH / YOGA COLLECTION</div>
                        <h1>header</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        */}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {};

    return {
        video: ownProps.params.video_id ? videos[Number(ownProps.params.video_id)] : null
    }
}

export default connect(mapStateToProps, {})(VideosHeader);
