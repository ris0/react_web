// API
// TODO improve config
import { API_VERSION, API_KEY } from '../../config/development';

function buildUrl(url) {
    return `/api/${API_VERSION}${url}`;
}

// TODO which one for home?
const HOMEPAGE = buildUrl('/web/homepage');
const EXPLORE = buildUrl('/explore');

const FEED = buildUrl('/feed'); // + /[account_name]

// TODO compose this with query param builder
const CATEGORY_FEED = buildUrl('/content/sample'); // + ?category_ids=123,456,789

function request(url, body) {
    return fetch(url, {
        headers: {
            Authorization: `KnowsyAPI api_key="${API_KEY}"`
        }
    });
}

export function getHomepageFeed() {
    return request(HOMEPAGE);
}

export function getCategoriesFeed(categories) {
    return fetch(CATEGORY_FEED);
}
