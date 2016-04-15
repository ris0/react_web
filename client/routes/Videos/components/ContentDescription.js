import React from 'react';
import Tags from '../../../components/Tags';

class ContentDescription extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { caption, title } = this.props;

        return (
            <div className="content-description">
                <div className="content-title">
                    <p>category / collection</p>
                    <h1>{title}</h1>
                    {/*
                    <Tags items={['health', 'yoga', 'sport', 'body', 'collection', 'workout']}/>
                    */}
                </div>
                <div className="content-body">
                    <p>{caption}</p>
                </div>
            </div>
        );
    }
}

export default ContentDescription;
