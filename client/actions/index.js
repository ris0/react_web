import { getRandom, getVideo, getHomepageFeed } from '../utils'

export const TOGGLE_DROPDOWN_NAV = 'TOGGLE_DROPDOWN_NAV'
export function toggleDropdownNav() {
    return { type: TOGGLE_DROPDOWN_NAV }
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

const handleResponse = (dispatch) => (response) => {
    dispatch(setLoading(false))
    return response.json()
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
        // TODO figure out what we need to decide if a fetch is needed:
        // - pageHome.loaded?
        // - videos not empty?
        const shouldFetch = !getState().pageHome.loaded
        if (shouldFetch) {
            return fetchHome(dispatch)
        } else {
            return Promise.resolve()
        }
    }
}

export function fetchVideoIfNeeded(videoId) {
    return function(dispatch, getState) {
        const shouldFetch = !getState().videos[videoId]
        if (shouldFetch) {
            dispatch(setLoading(true))
            return getVideo(videoId)
                .then(handleResponse(dispatch))
                .then((result) => dispatch(receiveVideoData(result)))
        } else {
            return Promise.resolve()
        }
    }
}

export function fetchRelatedContent() {
    return function(dispatch, getState) {
        dispatch(setLoading(true))
        return getRandom()
            .then(handleResponse(dispatch))
            .then((result) => {
                dispatch(receiveRelatedContent(result))
            })
    }
}
