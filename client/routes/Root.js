import React from 'react';
import { Link } from 'react-router';

export default class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Root</h1>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="categories">Categories</Link>
                </div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

