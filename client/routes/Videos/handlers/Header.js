import React from 'react';

class VideosHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="video-page">
                <div className="video-main">
                    <div className="video">
                        <video src="/gizmo_video.mp4" controls="controls"></video>
                        {/*
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

export default VideosHeader;
