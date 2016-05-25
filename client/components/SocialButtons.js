import React from 'react';

function SocialButtons(props) {
    const { className } = props;
    return (
        <div className={`social-buttons ${className}`}>
            <a href="#" className="facebook"><span className="icon icon-facebook" /></a>
            <a href="#" className="twitter"><span className="icon icon-twitter" /></a>
            <a href="#" className="pinterest"><span className="icon icon-pinterest" /></a>
            {/*
            <a href="#"><span className="icon icon-youtube" /></a>
            <a href="#"><span className="icon icon-instagram_round" /></a>
            */}
        </div>
    )
}

SocialButtons.propTypes = {
    className: React.PropTypes.string
}

SocialButtons.defaultProps = {
    className: ''
}

export default SocialButtons
