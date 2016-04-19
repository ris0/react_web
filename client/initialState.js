export default {
    user: {},
    categories: {},
    app: {
        isLoading: false,
        navLinks: [
            'about',
            'subscribe',
            'jobs',
            'advertise',
            'contact'
        ],
        showMainNav: false,
        categories: {},
        currentVideoStatus: null,
    },
    videos: {},
    pageHome: {
        recentVideos: [],
        featuredVideos: [],
        loaded: false
    },
    pageVideo: {
        similarContentByVideoId: []
    }
}
