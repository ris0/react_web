export function facebookShare(content) { // appId, message, url
    var result = "https://www.facebook.com/dialog/feed?"
        + "app_id=" + encodeURIComponent(content.appId)
        + "&display=popup&caption=" + encodeURIComponent(content.message)
        + "&link=" + encodeURIComponent(content.url)
        + "&redirect_uri=" + encodeURIComponent("https://www.facebook.com/")
    window.open(result)
}

export function twitterShare(content) { // message, url
    var tweet = content.message === "" ?
        url : content.message + " " + content.url
    var result = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet)
    window.open(result)
}

export function pinterestShare(content) { // url, media
    var result = "https://pinterest.com/pin/create/button/?url="
        + encodeURIComponent(content.url) + "&media="
        + encodeURIComponent(content.media) + "&description="
        + encodeURIComponent(content.media)
    window.open(result)
}

export function emailShare(content) {
    var result = "mailto:?subject=" + encodeURIComponent(content.message) + "&body=" + encodeURIComponent(content.url)
    window.open(result)
}