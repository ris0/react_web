import React from 'react'

class VideoThumbnail extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section className="video-list-item">
                <div className="video-list-item-thumb">
                </div>
                <div className="video-list-item-description">
                    <h1>CATEGORY / COLLECTION</h1>
                    <h2>header</h2>
                    <p>
                        lorem ipstum blah est and something her with wow ermaherd lerem ipsum sdolkj dollar dollar bill 3 dollar bill
                        lorem ipstum blah est and something her with wow ermaherd lerem ipsum sdolkj dollar dollar bill 3 dollar bill
                    </p>
                </div>
            </section>
        )
    }
}

class VideoGrid extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { title, hasMore } = this.props;

        return (
            <section className="section video-list">
                <div className="video-list-title">
                    <h1>{title}&nbsp;</h1>
                    <a><i>See All</i></a>
                </div>
                <div className="video-list-items">
                    {
                        [0,1,2,3,4,5,6,7].map((i) => <VideoThumbnail key={i} />)
                    }
                </div>
                {
                    hasMore ?
                        <div className="video-list-footer">
                            <a><i>Load More</i></a>
                        </div> : null
                }
            </section>
        );
    }
}

export default VideoGrid;
