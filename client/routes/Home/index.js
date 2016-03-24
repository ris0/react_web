import React from 'react';
import { connect } from 'react-redux';
import { intoArray, get, comp, map } from 'mori';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        // OKAY, this works/is sweet... mori all top->bottom
        const mapToJs = comp(intoArray, map);
        const videos = toClj(this.props.videos);

        return (
            <div>
                <h3>Home</h3>
                <p>Videos</p>
                <ul>
                </ul>
                <ul>
                    {mapToJs((video) => <li key={get(video, 'name')}>{get(video, 'name')}</li>, videos)}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    // can use
    // `ownProps.params.id`
    // to grab specific video, for example
    return {
        videos: Object.values(state.videos)
    }
}

export default connect(mapStateToProps, {})(Home);
