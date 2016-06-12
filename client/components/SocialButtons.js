import React from 'react'
import {facebookShare, twitterShare, pinterestShare, emailShare} from '../utils/socialMedia'

function share(icon) {
    const service = icon.name

    const content = {
        name: service,
        appId: '',
        message: 'Find more videos likes this on Knowsy.co!',
        media: window.location.href,
        url: window.location.href
    }

    switch (service) {
        case 'facebook': return facebookShare(content)
        case 'twitter': return twitterShare(content)
        case 'pinterest': return pinterestShare(content)
        case 'email': return emailShare(content)
        default: return
    }
}

function SocialButtons(props) {
    const { icons, className, shareable} = props

    return (
        <div className={`social-buttons ${className}`}>
            {
                icons.map((icon) => {
                    return (
                        <a
                            href={shareable ? null : icon.link}
                            className={icon.name}
                            onClick={shareable ? () => share(icon) : null}
                            key={icon.name}>
                            <span className={`icon icon-${icon.iconName || icon.name}`}/>
                        </a>
                    )
                })
            }
        </div>
    )}

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