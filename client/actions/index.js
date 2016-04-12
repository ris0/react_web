import { handleResponse, getConfigData, getRandom, getVideo, getHomepageFeed } from '../utils'

export const TOGGLE_DROPDOWN_NAV = 'TOGGLE_DROPDOWN_NAV'
export function toggleDropdownNav() {
    return { type: TOGGLE_DROPDOWN_NAV }
}

export const RECEIVE_CONFIG_DATA = 'RECEIVE_CONFIG_DATA'
export function receiveConfigData(data) {
    return {
        type: RECEIVE_CONFIG_DATA,
        data
    }
}

export const RECEIVE_HOMEPAGE_DATA = 'RECEIVE_HOMEPAGE_DATA'
export function receiveHomepageData(data) {
    return {
        type: RECEIVE_HOMEPAGE_DATA,
        data
    }
}

export const RECEIVE_VIDEO_DATA = 'RECEIVE_VIDEO_DATA'
export function receiveVideoData(data) {
    return {
        type: RECEIVE_VIDEO_DATA,
        data
    }
}

export const RECEIVE_RELATED_CONTENT = 'RECEIVE_RELATED_CONTENT'
export function receiveRelatedContent(data) {
    return {
        type: RECEIVE_RELATED_CONTENT,
        data
    }
}

export const SET_LOADING = 'SET_LOADING'
export function setLoading(isLoading) {
    return {
        type: SET_LOADING,
        isLoading
    }
}

export const SET_CURRENT_VIDEO_STATUS = 'SET_CURRENT_VIDEO_STATUS'
export function setCurrentVideoStatus(video) {
    return {
        type: SET_CURRENT_VIDEO_STATUS,
        video
    }
}

export function fetchHome(dispatch) {
    dispatch(setLoading(true))
    return getHomepageFeed()
        .then(handleResponse(dispatch))
        .then((result) => {
            dispatch(receiveVideoData([...result.featured, ...result.recent]))
            dispatch(receiveHomepageData(result))
        })
}

export function fetchHomeIfNeeded() {
    return function(dispatch, getState) {
        const { loaded } = getState().pageHome
        if (loaded) {
            return Promise.resolve()
        } else {
            return fetchHome(dispatch)
        }
    }
}

export function fetchVideoIfNeeded(videoId) {
    return function(dispatch, getState) {
        const video = getState().videos[videoId]
        if (video) {
            return Promise.resolve(video)
        } else {
            dispatch(setLoading(true))
            return getVideo(videoId)
                .then(handleResponse(dispatch))
                .then((result) => dispatch(receiveVideoData(result)))
        }
    }
}

export function fetchRelatedContent() {
    return function(dispatch, getState) {
        dispatch(setLoading(true))
        return getRandom()
            .then(handleResponse(dispatch))
            .then((result) => dispatch(receiveRelatedContent(result)))
    }
}

export function fetchConfigData() {
    return function(dispatch, getState) {
        const { categories } = getState()
        if (categories && categories.length) {
            return Promise.resolve(categories)
        } else {
            dispatch(setLoading(true))
            return getConfigData()
                .then(handleResponse(dispatch))
                .then((result) => dispatch(receiveConfigData(result)))
        }

    }
}
