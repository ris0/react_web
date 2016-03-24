import React from 'react';
import { connect } from 'react-redux';

class Videos extends React.Component {

    static fetchData() {
        console.log('fetching...');
    }

    constructor() {
        super();
    }

    componentDidMount() {
        Videos.fetchData();
    }

    render() {
        const { video } = this.props;
        return (
            <div>
                <h3>Videos</h3>
                <h5>Showing Video: {video ? video.name : 'Unknown'}</h5>
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const videos = state.videos || {};

    return {
        video: videos[ownProps.params.video_id]
    }
}

export default connect(mapStateToProps, {})(Videos);
