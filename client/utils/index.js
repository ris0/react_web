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

const HOMEPAGE = '/web/home'
const EXPLORE = '/explore'
const VIDEO = '/content'
const FEED = '/feed' // + /[account_name]
const CONFIG = '/config'
const CATEGORY_FEED = '/web/category'
const NEWSLETTER = '/marketing/email_list'

let baseRequest = {
    headers: {
        Authorization: `KnowsyAPI api_key="${API_KEY}"`
    }
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

export function addSubscriber(emailAddress) {
    const request = Object.assign({}, baseRequest, {
        method: 'POST',
        body: `email_address=${emailAddress}`
    })
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    return fetch(buildUrl(NEWSLETTER), request)
}

export function getHomepageFeed() {
    return fetch(buildUrl(HOMEPAGE), baseRequest)
}

export function getCategoriesFeed(categoryId) {
    return fetch(buildUrl(CATEGORY_FEED, { category_id: categoryId }), baseRequest)
}

export function getVideo(id) {
    return fetch(buildUrl(VIDEO, { unique_key: id }), baseRequest)
}

export function getRandom() {
    return fetch(buildUrl(EXPLORE), baseRequest)
}

export function getConfigData() {
    return fetch(buildUrl(CONFIG), baseRequest)
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

export function clipText(text = '', chars = 160) {
    // clip text to X length characters, ensuring that
    // words are not cut in half

    if (text.length) {
        const words = text.slice(0, chars).split(' ')
        const clippedText = words.slice(0, words.length - 1).join(' ')

        return `${clippedText}...`
    } else {
        return ''
    }
}

