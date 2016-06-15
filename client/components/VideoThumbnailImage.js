import React from 'react'

function isMobile(obj = {}) {
    const { windowWidth } = obj
    return windowWidth <= 500
}

export default function VideoThumbnailImage(props = {}) {
    const { isFeature, onLoad, video, windowWidth } = props
    const title = video && video.titles && video.titles.main ? video.titles.main : ''
    const resourceKey = isFeature ? 'feature' : 'cover'

    let imgSrc
    if (isFeature && isMobile({ windowWidth })) {
        imgSrc = video.resources.mobile.feature
    } else {
        imgSrc = video.resources[resourceKey]
    }

    return <img onLoad={onLoad} src={imgSrc} alt={title} />
}
