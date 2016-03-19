import { combineReducers } from 'redux';

function videos(state = {}, action) {
    return state;
}

function categories(state = {}, action) {
    return state;
}

const rootReducer = combineReducers({
    videos,
    categories
});

export default rootReducer;
