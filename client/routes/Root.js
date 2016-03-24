import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { isLoading } = this.props;
        console.log(isLoading)

        return (
            <div>
                <header style={{width: '100%', background: 'gray'}}>
                    <h1 style={{float: 'left'}}>Knowsy</h1>
                    <div style={{float: 'right'}}>
                        <Link to="/">Home</Link>&nbsp;
                        <Link to="categories">Categories</Link>
                        <Link to="about">About</Link>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </header>
                { isLoading ? <h1>L O A D I N G</h1> : null}
                <div>{this.props.children}</div>
                <footer style={{width: '100%', background: 'gray'}}>
                    <h1>I AM A FOOTER</h1>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.app.isLoading
    }
}

export default connect(mapStateToProps)(Root);
