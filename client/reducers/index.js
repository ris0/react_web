import { combineReducers } from 'redux'
import {
    TOGGLE_MAIN_NAV,
    RECEIVE_CONFIG_DATA,
    RECEIVE_HOMEPAGE_DATA,
    RECEIVE_VIDEO_DETAILS,
    RECEIVE_VIDEO_DATA,
    RECEIVE_VIDEOS_FOR_CATEGORY,
    SET_CURRENT_VIDEO_STATUS,
    SET_VIDEO_PAGE_PROPERTIES,
    SET_LOADING
} from '../actions'

function videos(state = {}, action) {
    switch (action.type) {
        case RECEIVE_VIDEO_DATA:
            const videos = action.data.length ? action.data : [action.data]
            return videos.reduce((acc, video) => {
                return Object.assign({}, acc, { [video.unique_key] : video })
            }, state)
    }
    return state
}

function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CONFIG_DATA:
            const { categories } = action.data
            return categories.reduce((categoriesMap, category) =>
                Object.assign({}, categoriesMap, {
                    [category.id]: Object.assign({}, categoriesMap[category.id] || { videos: [] }, category)
                }), state)

        case RECEIVE_VIDEOS_FOR_CATEGORY:
            const { categoryId, videoIds } = action.data
            const updatedCategory = Object.assign({}, state[categoryId], {
                videos: videoIds
            })
            return Object.assign({}, state, {
                [categoryId]: updatedCategory
            })
    }
    return state
}

function pageHome(state = {}, action) {
    switch (action.type) {
        case RECEIVE_HOMEPAGE_DATA:
            const { featured, recent } = action.data
            return Object.assign({}, state, {
                featuredVideos: featured.map((video) => video.unique_key),
                recentVideos: recent.map((video) => video.unique_key),
                loaded: true
            })
    }
    return state
}

function updateVideoPageProperties(state, id, properties) {
    let newPropertiesForUniqueId = Object.assign({}, state.propertiesByUniqueId[id], properties)
    let propertiesByUniqueId = Object.assign({}, state.propertiesByUniqueId, {
        [id]: newPropertiesForUniqueId
    })

    return Object.assign({}, state, { propertiesByUniqueId })
}

function pageVideo(state = {}, action) {
    switch (action.type) {
        case RECEIVE_VIDEO_DETAILS:
            return updateVideoPageProperties(state, action.data.unique_key, { similarContentByVideoId: true })
        case SET_VIDEO_PAGE_PROPERTIES:
            return updateVideoPageProperties(state, action.data.unique_key, { showAllText: action.data.showAllText })
    }
    return state
}

function user(state = {}, action) {
    return state
}

function currentVideoData(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_VIDEO_STATUS:
            return {
                unique_key: action.video && action.video.unique_key
            }
    }
    return state
}

function app(state = {}, action) {
    switch (action.type) {
        case SET_LOADING:
            return Object.assign({}, state, { isLoading: action.isLoading })
        case TOGGLE_MAIN_NAV:
            return Object.assign({}, state, { showMainNav: !state.showMainNav })
    }
    return state
}

const rootReducer = combineReducers({
    app,
    user,
    videos,
    categories,
    currentVideoData,
    pageHome,
    pageVideo
})

export default rootReducer
