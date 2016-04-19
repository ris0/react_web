import { handleResponse, getConfigData, getRandom, getCategoriesFeed, getVideo, getHomepageFeed } from '../utils'

export const TOGGLE_MAIN_NAV = 'TOGGLE_MAIN_NAV'
export function toggleMainNav() {
    return { type: TOGGLE_MAIN_NAV }
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

export const RECEIVE_VIDEOS_FOR_CATEGORY = 'RECEIVE_VIDEOS_FOR_CATEGORY'
export function receiveVideosForCategory(categoryId, videoIds) {
    return {
        type: RECEIVE_VIDEOS_FOR_CATEGORY,
        data: { categoryId, videoIds }
    }
}

export const RECEIVE_VIDEO_DETAILS = 'RECEIVE_VIDEO_DETAILS'
export function receiveVideoDetails(data) {
    return {
        type: RECEIVE_VIDEO_DETAILS,
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

function fetchHome(dispatch) {
    dispatch(setLoading(true))
    return getHomepageFeed()
        .then((response) => {
            dispatch(setLoading(false))
            return handleResponse(response)
        })
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
        const hasLoadedVideoDetails = getState().pageVideo.similarContentByVideoId[videoId]
        if (hasLoadedVideoDetails) {
            const video = getState().videos[videoId]
            return Promise.resolve(video)
        } else {
            dispatch(setLoading(true))
            return getVideo(videoId)
                .then((response) => {
                    dispatch(setLoading(false))
                    return handleResponse(response)
                })
                .then((video) => {
                    dispatch(receiveVideoData(video))
                    dispatch(receiveVideoDetails(video))
                })
        }
    }
}

function fetchCategoryContent(dispatch, categoryId) {
    dispatch(setLoading(true))
    return getCategoriesFeed(categoryId)
        .then((response) => {
            dispatch(setLoading(false))
            return handleResponse(response)
        })
        .then((result) => {
            // Note: this sucks, but this needs to happen in this order or else mapping fns may
            // look for a video (from a category) that isn't in the videos hash
            // TODO investigate https://github.com/acdlite/redux-batched-updates
            dispatch(receiveVideoData(result))
            dispatch(receiveVideosForCategory(categoryId, result.map((video) => video.unique_key)))
        })
}

export function fetchCategoryContentIfNeeded(categoryId) {
    return function(dispatch, getState) {
        const { categories, videos } = getState()
        const category = categories[categoryId] || {}

        if (category.videos && category.videos.length) {
            const hasAll = category.videos.every((videoId) => Boolean(videos[videoId]))
            if (hasAll) {
                return Promise.resolve(category.videos.map((videoId) => videos[videoId]))
            } else {
                return fetchCategoryContent(dispatch, categoryId)
            }
        } else {
            return fetchCategoryContent(dispatch, categoryId)
        }
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
                .then((response) => {
                    dispatch(setLoading(false))
                    return handleResponse(response)
                })
                .then((result) => dispatch(receiveConfigData(result)))
        }

    }
}
