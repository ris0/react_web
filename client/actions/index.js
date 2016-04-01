import { getHomepageFeed } from '../utils';

export const RECEIVE_HOMEPAGE_DATA = 'RECEIVE_HOMEPAGE_DATA';
export function receiveHomepageData(data) {
    return {
        type: RECEIVE_HOMEPAGE_DATA,
        data
    }
}

export const RECEIVE_VIDEO_DATA = 'RECEIVE_VIDEO_DATA';
export function receiveVideoData(data) {
    return {
        type: RECEIVE_VIDEO_DATA,
        data
    }
}

export const SET_LOADING = 'SET_LOADING';
export function setLoading(isLoading) {
    return {
        type: SET_LOADING,
        isLoading
    }
}

export function fetchHome(dispatch) {
    dispatch(setLoading(true));
    return getHomepageFeed()
        .then((response) => {
            dispatch(setLoading(false));
            return response.json();
        })
        .then((result) => {
            dispatch(receiveVideoData([...result.featured, ...result.recent]));
            dispatch(receiveHomepageData(result));
        });
}

export function fetchHomeIfNeeded() {
    return function(dispatch, getState) {
        // TODO figure out what we need to decide if a fetch is needed:
        // - pageHome.loaded?
        // - videos not empty?
        const shouldFetch = !getState().pageHome.loaded;
        if (shouldFetch) {
            fetchHome(dispatch)
        }
    }
}

export function fetchVideoIfNeeded(videoId) {
    return function(dispatch, getState) {
    }
}
