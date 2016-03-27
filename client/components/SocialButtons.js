import React from 'react';

class SocialButtons extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-pinterest-p" /></a>
                <a href="#"><i className="fa fa-youtube" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
            </div>
        );
    }
}

export default SocialButtons;
