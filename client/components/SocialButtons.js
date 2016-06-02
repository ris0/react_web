import React from 'react';

function SocialButtons(props) {
    const { icons, className, shareable } = props;
    return (
        <div className={`social-buttons ${className}`}>
            {
                icons.map((icon) => {
                    return (
                        <a
                            href={shareable ? null : icon.link}
                            className={icon.name}
                            onClick={shareable ? window.alert.bind(window, 'SHARE') : null}
                            key={icon.name}>
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
    icons: React.PropTypes.array,
    shareable: React.PropTypes.bool
}

SocialButtons.defaultProps = {
    className: '',
    icons: [],
    shareable: false
}

export default SocialButtons
