import React from 'react';
import Tags from '../../../components/Tags'
import { clipText } from '../../../utils'
import Recipe from './Recipe'

function ContentActions(props) {
    const { onClickPrint, video } = props

    return (
        <div className="content-actions">
            <a className="icon-wrapper" onClick={onClickPrint}>
                <img className="icon icon-print" src="/printer_icon.png" alt="print" />
                <span><h2>print</h2></span>
            </a>
            <a className="icon-wrapper" href={`mailto:?subject=Knowsy: ${video.title}&body=${video.caption}`}>
                <img className="icon" src="/share_icon.png" alt="share" />
                <span><h2>share</h2></span>
            </a>
        </div>
    )
}

export class ContentDescription extends React.Component {
    constructor() {
        super();
        this.onClickShowButton = this.onClickShowButton.bind(this)
        this.onPrint = this.onPrint.bind(this)
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

    onPrint() {
        const { onClickShowAll, showAllText } = this.props

        if (!showAllText) {
            onClickShowAll(true)
        }

        window.setTimeout(() => {
            window.print()
        })
    }

    render() {
        const { video, onClickShowAll, showAllText } = this.props
        const bodyText = showAllText ? video.caption : clipText(video.caption, 250)

        return (
            <div className="content-description" ref="contentDescription">
                <div className="content-title">
                    <h1>{video.title}</h1>
                    <ContentActions onClickPrint={this.onPrint} video={video} />
                </div>
                <div className="content-body">
                    <p>{bodyText}</p>
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
