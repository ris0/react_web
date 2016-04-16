import React from 'react';

export default function SocialButtons(props) {
    const { className } = props;
    return (
        <div className={`social-buttons ${className}`}>
            <a href="#"><span className="icon icon-facebook" /></a>
            <a href="#"><span className="icon icon-twitter" /></a>
            <a href="#"><span className="icon icon-pinterest" /></a>
            <a href="#"><span className="icon icon-google" /></a>
            <a href="#"><span className="icon icon-youtube" /></a>
            <a href="#"><span className="icon icon-instagram_round" /></a>
        </div>
    )
}
