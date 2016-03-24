import { req } from '../utils';

export function fetchHome() {
    return function() {
    }
}

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

export function fetchHomeIfNeeded() {
    return function(dispatch, getState) {
        // TODO figure out what we need to decide if a fetch is needed:
        // - pageHome?
        // - videos not empty?
        const shouldFetch = true;
        if (shouldFetch) {
            dispatch(setLoading(true));
            setTimeout(function() {
                dispatch(receiveHomepageData({ something: 123 }))
                dispatch(receiveVideoData({ 1: {}, 2: {} }))
                dispatch(setLoading(false));
            }, 1500);
        }
    }
}

export function fetchVideoIfNeeded() {
    return function(dispatch, getState) {
    }
}
