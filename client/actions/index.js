import { handleResponse, getConfigData, getRandom, getCategoriesFeed, getVideo, getHomepageFeed } from '../utils'

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

export const RECEIVE_VIDEOS_FOR_CATEGORY = 'RECEIVE_VIDEOS_FOR_CATEGORY'
export function receiveVideosForCategory(categoryId, videoIds) {
    return {
        type: RECEIVE_VIDEOS_FOR_CATEGORY,
        data: { categoryId, videoIds }
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
        const video = getState().videos[videoId]
        if (video) {
            return Promise.resolve(video)
        } else {
            dispatch(setLoading(true))
            return getVideo(videoId)
                .then((response) => {
                    dispatch(setLoading(false))
                    return handleResponse(response)
                })
                .then((result) => dispatch(receiveVideoData(result)))
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
            dispatch(receiveVideosForCategory(categoryId, result.map((video) => video.unique_key)))
            dispatch(receiveVideoData(result))
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

export function fetchRelatedContent() {
    return function(dispatch, getState) {
        dispatch(setLoading(true))
        return getRandom()
            .then((response) => {
                dispatch(setLoading(false))
                return handleResponse(response)
            })
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
                .then((response) => {
                    dispatch(setLoading(false))
                    return handleResponse(response)
                })
                .then((result) => dispatch(receiveConfigData(result)))
        }

    }
}
