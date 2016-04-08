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
                    <Tags items={['health', 'yoga', 'sport', 'body', 'collection', 'workout']}/>
                </div>
                <div className="content-body">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in sodales nibh. Sed 
                        varius finibus consectetur. Vivamus at odio maximus, facilisis metus sed, condimentum 
                        sem. Vestibulum vel vulputate mi. Duis dui elit, vestibulum non dui sed, vestibulum 
                        sagittis ligula. Vivamus gravida iaculis luctus. In vestibulum sagittis libero, in molestie 
                        ante porta sodales. Suspendisse vel ex laoreet, imperdiet purus et, aliquam odio.
                    </p>
                    <p>
                        Nulla facilisi. Nam hendrerit et diam maximus pretium. Quisque ut ornare mauris, 
                        tincidunt bibendum libero. Etiam laoreet vel leo sit amet efficitur. Vivamus commodo 
                        fermentum nisi, nec tempor ante finibus vitae. Quisque ut ornare mauris, tincidunt 
                        bibendum libero. Etiam laoreet vel leo sit amet efficitur. Vivamus commodo fermentum 
                        nisi, nec tempor ante finibus vitae.
                    </p>
                </div>
            </div>
        );
    }
}

export default ContentDescription;
