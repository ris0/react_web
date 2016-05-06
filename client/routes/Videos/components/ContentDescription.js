import React from 'react';
import Tags from '../../../components/Tags';

class ContentDescription extends React.Component {
    constructor() {
        super();
    }

    setHTMLBody(__html) {
        return { __html }
    }

    render() {
        const { caption, title } = this.props;

        return (
            <div className="content-description">
                <div className="content-title">
                    <h1>{title}</h1>
                </div>
                <div className="content-body">
                    <p dangerouslySetInnerHTML={this.setHTMLBody(caption)} />
                </div>
            </div>
        );
    }
}

ContentDescription.propTypes = {
    caption: React.PropTypes.string,
    title: React.PropTypes.string
}

ContentDescription.defaultProps = {
    caption: '',
    title: ''
}

export default ContentDescription;
