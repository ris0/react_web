import { combineReducers } from 'redux';
import { RECEIVE_HOMEPAGE_DATA, RECEIVE_VIDEO_DATA, SET_LOADING } from '../actions';

function videos(state = {}, action) {
    switch (action.type) {
        case RECEIVE_VIDEO_DATA:
            return state;
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
            return state;
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
