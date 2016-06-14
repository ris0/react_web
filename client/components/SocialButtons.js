import React from 'react'
import { facebookShare, twitterShare, pinterestShare, buildEmailLink } from '../utils/socialMediaUtil'

function share(icon) {
    const service = icon.name

    // TODO update this message stuff
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
        default: return
    }
}

function buildLink(icon, content) {
    if (icon.name === 'email') {
        return  buildEmailLink(content)
    } else if (content) {
        return null
    } else {
        return icon.link
    }
}

function SocialButtons(props) {
    const { content, icons, className } = props

    return (
        <div className={`social-buttons ${className}`}>
            {
                icons.map((icon) => {
                    return (
                        <a
                            href={buildLink(icon, content)}
                            className={icon.name}
                            onClick={content ? () => share(icon) : null}
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
    content: React.PropTypes.object,
    icons: React.PropTypes.array
}

SocialButtons.defaultProps = {
    className: '',
    icons: []
}

export default SocialButtons
