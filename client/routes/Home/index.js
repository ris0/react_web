import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <p>Videos</p>
                <ul>
                    {this.props.videos.map((video) => <li key={video.name}>{video.name}</li>)}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        videos: Object.values(state.videos)
    }
}

export default connect(mapStateToProps, {})(Home);
