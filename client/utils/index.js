// API
import { API_VERSION, API_KEY } from 'config';

function buildUrl(url) {
    return `/${API_VERSION}${url}`;
}

// TODO which one for home?
const HOMEPAGE = buildUrl('/web/homepage');
const EXPLORE = buildUrl('/explore');

const FEED = buildUrl('/feed'); // + /[account_name]

// TODO compose this with query param builder
const CATEGORY_FEED = buildUrl('/content/sample'); // + ?category_ids=123,456,789

function req(url, body) {
    return fetch(url, {
        headers: {
            Authorization: `KnowsyAPI api_key="${API_KEY}"`
        }
    });
}

export function home() {
    return fetch(HOMEPAGE);
}

export function categories(categories) {
    return fetch(CATEGORY_FEED);
}
