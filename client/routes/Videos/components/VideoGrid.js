import React from 'react';

class VideoGrid extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { title } = this.props;

        return (
            <section className="section video-list">
                <div className="video-list-title">
                    <h1>{title}&nbsp;</h1>
                    <a><i>See All</i></a>
                </div>
                <div className="video-list-items">
                    {
                        [0,1,2,3,4,5,6,7].map((i) => <div key={i} className="video-list-item"><div></div></div>)
                    }
                </div>
            </section>
        );
    }
}

export default VideoGrid;
