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
    if (response.status >= 400) {
        // TODO log
        const err = new Error(response.statusText)
        err.status = response.status
        throw err
    }

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
            .then((result) => {
                dispatch(receiveRelatedContent(result))
            })
    }
}
