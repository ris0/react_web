import React from 'react';
import Tags from '../../../components/Tags';
import { clipText } from '../../../utils'

class ContentDescription extends React.Component {
    constructor() {
        super();
    }

    setHTMLBody(__html) {
        return { __html }
    }

    render() {
        const { caption, onClickShowAll, showAllText, title } = this.props
        const bodyText = showAllText ? caption : clipText(caption, 250)

        return (
            <div className="content-description">
                <div className="content-title">
                    <h1>{title}</h1>
                </div>
                <div className="content-body">
                    <p dangerouslySetInnerHTML={this.setHTMLBody(bodyText)} />
                    <button onClick={() => onClickShowAll(!showAllText)}>show { showAllText ? 'less' : 'more' }</button>
                </div>
            </div>
        );
    }
}

ContentDescription.propTypes = {
    caption: React.PropTypes.string,
    title: React.PropTypes.string,
    showAllText: React.PropTypes.bool,
    onClickShowAll: React.PropTypes.func
}

ContentDescription.defaultProps = {
    caption: '',
    title: '',
    showAllText: false,
    onClickShowAll: () => {}
}

export default ContentDescription;
