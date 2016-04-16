// API
import config from 'config'

const { API_ROOT, API_VERSION, API_KEY } = config

// TODO potentially use Node URL? for webpack?
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
const CONFIG = '/config'
const CATEGORY_FEED = '/content/sample'

function request(url, body) {
    return fetch(url, {
        headers: {
            Authorization: `KnowsyAPI api_key="${API_KEY}"`
        }
    })
}

export const handleResponse = (response) => {
    if (response.status >= 400) {
        // TODO log
        const err = new Error(response.statusText)
        err.status = response.status
        throw err
    }

    return response.json()
}

export function getHomepageFeed() {
    return request(buildUrl(HOMEPAGE))
}

export function getCategoriesFeed(categoryId) {
    return request(buildUrl(CATEGORY_FEED, { category_ids: categoryId }))
}

export function getVideo(id) {
    return request(buildUrl(VIDEO, { unique_key: id }))
}

export function getRandom() {
    return request(buildUrl(EXPLORE))
}

export function getConfigData() {
    return request(buildUrl(CONFIG))
}

// TODO move to fn utils
export function flatten(collection = []) {
    return collection.reduce((acc, arr) => [...acc, ...arr], [])
}

export function partitionN(n, collection = []) {
    let idx = 0
    let results = []
    while (idx < collection.length) {
        results.push(collection.slice(idx, idx + n))
        idx += n
    }
    return results
}
