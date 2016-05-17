import React from 'react';
import Tags from '../../../components/Tags'
import { clipText } from '../../../utils'
import Recipe from './Recipe'

class ContentDescription extends React.Component {
    constructor() {
        super();
        this.onClickShowButton = this.onClickShowButton.bind(this)
    }

    // TODO now that we have better content description fields
    // can we ditch dangerouslySetInnerHTML?
    setHTMLBody(__html) {
        return { __html }
    }

    onClickShowButton() {
        const { onClickShowAll, showAllText } = this.props
        const { contentDescription } = this.refs
        onClickShowAll(!showAllText)
        if (showAllText && contentDescription) {
            // FIXME feels janky and wrong... fix this
            //contentDescription.scrollIntoView()
        }
    }

    render() {
        const { video, onClickShowAll, showAllText } = this.props
        const bodyText = showAllText ? video.caption : clipText(video.caption, 250)

        return (
            <div className="content-description" ref="contentDescription">
                <div className="content-title">
                    <h1>{video.title}</h1>
                </div>
                <div className="content-body">
                    <p dangerouslySetInnerHTML={this.setHTMLBody(bodyText)} />
                    <button onClick={this.onClickShowButton}>show { showAllText ? 'less' : 'more' }</button>
                    { showAllText && Recipe.isRecipe(video) ?
                            <Recipe instructions={video.directions} ingredients={video.recipe} /> : null }
                </div>
            </div>
        );
    }
}

ContentDescription.propTypes = {
    video: React.PropTypes.object,
    showAllText: React.PropTypes.bool,
    onClickShowAll: React.PropTypes.func
}

ContentDescription.defaultProps = {
    video: {},
    showAllText: false,
    onClickShowAll: () => {}
}

export default ContentDescription;
