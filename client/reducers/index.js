import { combineReducers } from 'redux'
import {
    TOGGLE_DROPDOWN_NAV,
    RECEIVE_CONFIG_DATA,
    RECEIVE_HOMEPAGE_DATA,
    RECEIVE_RELATED_CONTENT,
    RECEIVE_VIDEO_DATA,
    SET_CURRENT_VIDEO_STATUS,
    SET_LOADING
} from '../actions'

function videos(state = {}, action) {
    switch (action.type) {
        case RECEIVE_VIDEO_DATA:
            const videos = action.data.length ? action.data : [action.data]
            const results = videos.reduce((acc, video) => {
                return Object.assign({}, state, acc, { [video.unique_key] : video })
            }, {})
            return results
    }
    return state
}

function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CONFIG_DATA:
            const { categories } = action.data
            return categories.map((category) => Object.assign({}, category, {
                link: category.name
            }))
    }
    return state
}

// TODO do I need this?
function pageCategories(state = {}, action) {
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

function pageVideo(state = {}, action) {
    switch (action.type) {
        case RECEIVE_RELATED_CONTENT:
            return Object.assign({}, state, {
                relatedContent: action.data
            })
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
        case TOGGLE_DROPDOWN_NAV:
            return Object.assign({}, state, { showDropdownNav: !state.showDropdownNav })
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
    pageCategories,
    pageVideo
})

export default rootReducer
