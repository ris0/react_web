import { get, comp, mapcat, apply, assoc, equals, hashMap, reduceKV, toClj } from 'mori';

const defaultState = hashMap();

function videos(state = defaultState, action) {
    // need to keep track of
    // - content (name? the actual video data)
    // - featured (vec of ids)
    // - recent (vec of ids)
    return state;
}

function categories(state = defaultState, action) {
    // a category will have some associated video ids,
    // so I need to keep track of those as they are fetched
    // note, asking for content for a given category will grab
    // rerfences to videos... some videos will already be present
    // in our videos reducer/cache, others will need to be assoc'd in
    // if we don't have them yet...
    // depending on how big this guys, we may or may not need to start
    // clearing out references to videos after awhile, but hopefully not...
    return state;
}

function combineReducers(...reducerFns) {
    const reducers = apply(hashMap,
                           mapcat((fn) => vector(fn.name, fn), toClj(reducerFns)));

    return function combination(state = defaultState, action) {
        let hasChanged = false;
        const nextState = reduceKV((stateTree, key, reducer) => {
            const previousStateForKey = get(state, key, hashMap());
            const nextStateForKey = reducer(previousStateForKey, action);
            if (!hasChanged && equals(previousStateForKey, nextStateForKey)) {
                hasChanged = true;
            }
            return assoc(stateTree, key, nextStateForKey);
        }, hashMap(), reducers);

        return hasChanged ? nextState : state;
    }
}

const rootReducer = combineReducers(videos, categories);

export default rootReducer;
