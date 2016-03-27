import React from 'react';

class Tags extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { items } = this.props;
        return (
            <div className="tags">
                {items.map((item) => <div key={item} className="tag">{item}</div>)}
            </div>
        );
    }
}

Tags.defaultProps = {
    items: []
}

Tags.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.string)
}

export default Tags;
