import React from 'react';
import Tags from '../../../components/Tags';
import { clipText } from '../../../utils'

class ContentDescription extends React.Component {
    constructor() {
        super();
        this.onClickShowButton = this.onClickShowButton.bind(this)
    }

    setHTMLBody(__html) {
        return { __html }
    }

    onClickShowButton() {
        const { onClickShowAll, showAllText } = this.props
        onClickShowAll(!showAllText)
        if (showAllText) {
            // TODO scroll back to top?
            //window.scrollTo(0, 0)
        }
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
                    <button onClick={this.onClickShowButton}>show { showAllText ? 'less' : 'more' }</button>
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
