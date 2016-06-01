import React from 'react';

function SocialButtons(props) {
    const { icons, className } = props;
    return (
        <div className={`social-buttons ${className}`}>
            {
                icons.map((icon) => {
                    return (
                        <a href="#" className={icon.name} key={icon.name}>
                            <span className={`icon icon-${icon.iconName || icon.name}`}/>
                        </a>
                    )
                })
            }
        </div>
    )
}

SocialButtons.propTypes = {
    className: React.PropTypes.string,
    icons: React.PropTypes.array
}

SocialButtons.defaultProps = {
    className: '',
    icons: []
}

export default SocialButtons
