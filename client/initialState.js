const baseSocialIcons = [
    { name: 'facebook' },
    { name: 'twitter' },
    { name: 'pinterest' }
]

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
        socialIcons: baseSocialIcons.concat([
            { name: 'youtube' },
            { name: 'instagram', iconName: 'instagram_round' }
        ]),
        socialShareIcons: baseSocialIcons,
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
