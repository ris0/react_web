import React from 'react';
import { connect } from 'react-redux';
import ContentDescription from '../components/ContentDescription';
import VideoGrid from '../components/VideoGrid';

class VideosMain extends React.Component {

    static fetchData() {
        console.log('fetching...');
    }

    constructor() {
        super();
    }

    componentDidMount() {
        VideosMain.fetchData();
    }

    render() {
        const { video } = this.props;
        return (
            <section className="video-page">
                {/*
                    <div className="section video-user-controls">
                    <div>
                    <a href="#"><i className="fa fa-clock-o"/>&nbsp;watch later</a>
                    <a href="#"><i className="fa fa-plus" />&nbsp;add to queue</a>
                    <a href="#"><i className="fa fa-heart-o" /></a>
                    </div>
                    </div>
                */}
                <ContentDescription />
                <VideoGrid title="Sample Category"/>
                <VideoGrid title="Some Title"/>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {};

    return {
        video: videos[ownProps.params.video_id]
    }
}

export default connect(mapStateToProps, {})(VideosMain);
