import React from 'react'

function isMobile(obj = {}) {
    const { windowWidth } = obj
    return windowWidth <= 500
}

export default function VideoThumbnailImage(props = {}) {
    const { isFeature, video, windowWidth } = props
    const resourceKey = isFeature ? 'feature' : 'cover'

    let imgSrc
    if (isFeature && isMobile({ windowWidth })) {
        imgSrc = video.resources.mobile.feature
    } else {
        imgSrc = video.resources[resourceKey]
    }

    return <img src={imgSrc} alt={video.title} />
}
