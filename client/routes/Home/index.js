import React from 'react';
import { fetchHome } from '../../actions';
import { connect } from 'react-redux';

class Home extends React.Component {

    static fetchData(dispatch, params, query) {
        return fetchHome(dispatch);
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

        const { featuredVideos, recentVideos } = this.props;

        return (
            <div>
                <h3>Home</h3>
                <p>Featured Videos</p>
                <ul>
                    {featuredVideos.map((video) => <li key={video.title}>{video.title}</li>)}
                </ul>
                <p>Recent Videos</p>
                <ul>
                    {recentVideos.map((video) => <li key={video.title}>{video.title}</li>)}
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
