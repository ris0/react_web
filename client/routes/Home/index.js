import React from 'react';
import { fetchHomeIfNeeded } from '../../actions';
import { connect } from 'react-redux';

class Home extends React.Component {

    static fetchData() {
        console.log('fetching...');
    }

    constructor() {
        super();
    }

    componentDidMount() {
        // TODO move this fetch call to Root, since the /home service call
        // is really what loads the vast majority of the data... it needs
        // to happen before any and all routes are loaded
        this.props.fetchHomeIfNeeded();
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <p>Featured Videos</p>
                <ul>
                    {this.props.featuredVideos.map((video) => <li key={video.name}>{video.name}</li>)}
                </ul>
                <p>Recent Videos</p>
                <ul>
                    {this.props.recentVideos.map((video) => <li key={video.name}>{video.name}</li>)}
                </ul>
            </div>
        )
    }
}

function dereferenceVideos(state, name) {
    return state.pageHome[name].map((videoId) => state.videos[videoId]);
}

function mapStateToProps(state, ownProps) {
    return {
        featuredVideos: dereferenceVideos(state, 'featuredVideos'),
        recentVideos: dereferenceVideos(state, 'recentVideos')
    }
}

export default connect(mapStateToProps, { fetchHomeIfNeeded })(Home);
