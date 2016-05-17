export default {
    user: {},
    categories: {},
    app: {
        isLoading: false,
        navLinks: [
            'about',
            'jobs',
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
        propertiesByUniqueId: {}
    }
}
