// API
import config from 'config'

const { API_ROOT, API_VERSION, API_KEY } = config

function buildUrl(url, params) {
    let requestUrl = `${API_ROOT}/${API_VERSION}${url}`

    if (params) {
        requestUrl += '?'
        for (let key in params) {
            requestUrl += `${key}=${params[key]}`
        }
    }

    return requestUrl
}

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
