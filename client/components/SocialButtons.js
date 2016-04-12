import React from 'react';

export default function SocialButtons(props) {
    const { className } = props;
    return (
        <div className={`social-buttons ${className}`}>
            <a href="#"><i className="fa fa-facebook" /></a>
            <a href="#"><i className="fa fa-twitter" /></a>
            <a href="#"><i className="fa fa-pinterest-p" /></a>
            <a href="#"><i className="fa fa-youtube" /></a>
            <a href="#"><i className="fa fa-instagram" /></a>
        </div>
    )
}
