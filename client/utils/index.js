// API
// TODO improve config, since webpack alias won't exist in node
//http://stackoverflow.com/questions/32217165/can-i-detect-if-my-script-is-being-processed-by-webpack
import { API_VERSION, API_KEY } from '../../config/development'

function buildUrl(url, params) {
    let requestUrl = `/api/${API_VERSION}${url}`
    if (params) {
        requestUrl += '?'
        for (let key in params) {
            requestUrl += `${key}=${params[key]}`
        }
    }

    return requestUrl
}

// TODO which one for home?
const HOMEPAGE = '/web/homepage'
const EXPLORE = '/explore'
const VIDEO = '/content'
const FEED = '/feed' // + /[account_name]
const CATEGORY_FEED = '/content/sample' // + ?category_ids=123,456,789

function request(url, body) {
    return fetch(url, {
        headers: {
            Authorization: `KnowsyAPI api_key="${API_KEY}"`
        }
    })
}

export function getHomepageFeed() {
    return request(buildUrl(HOMEPAGE))
}

export function getCategoriesFeed(categories) {
    return fetch(buildUrl(CATEGORY_FEED))
}

export function getVideo(id) {
    return request(buildUrl(VIDEO, { unique_key: id }))
}

export function getRandom() {
    return request(buildUrl(EXPLORE))
}
