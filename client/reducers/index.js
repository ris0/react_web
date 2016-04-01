import { combineReducers } from 'redux';
import { RECEIVE_HOMEPAGE_DATA, RECEIVE_VIDEO_DATA, SET_LOADING } from '../actions';

function videos(state = {}, action) {
    switch (action.type) {
        case RECEIVE_VIDEO_DATA:
            const results = action.data.reduce((acc, video) => {
                return Object.assign({}, state, acc, { [video.id]: video });
            }, {});
            return results;
    }
    return state;
}

function categories(state = {}, action) {
    return state;
}

function pageCategories(state = {}, action) {
    return state;
}

function pageHome(state = {}, action) {
    switch (action.type) {
        case RECEIVE_HOMEPAGE_DATA:
            const { featured, recent } = action.data;
            return Object.assign({}, state, {
                featuredVideos: featured.map((video) => video.id),
                recentVideos: recent.map((video) => video.id),
                loaded: true
            });
    }
    return state;
}

function pageVideo(state = {}, action) {
    return state;
}

function user(state = {}, action) {
    return state;
}

function app(state = {}, action) {
    switch (action.type) {
        case SET_LOADING:
            return Object.assign({}, state, { isLoading: action.isLoading });
    }
    return state;
}

const rootReducer = combineReducers({
    app,
    user,
    videos,
    categories,
    pageHome,
    pageCategories,
    pageVideo
});

export default rootReducer;
