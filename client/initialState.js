export default {
    user: {},
    app: {
        isLoading: false,
        navLinks: [
            'about',
            'subscribe',
            'jobs',
            'advertise',
            'contact'
        ],
        showDropdownNav: false,
        categories: [
            { name: 'tech & digital', link: '' },
            { name: 'social media', link: '' },
            { name: 'health & wellness', link: '' },
            { name: 'drinks & entertaining', link: '' },
            { name: 'sex & relationships', link: '' },
            { name: 'career & workplace', link: '' },
            { name: 'style & beauty', link: '' },
            { name: 'home', link: '' }
//            'parenting',
//            'pets',
//            'travel',
//            'finance & investing',
//            'legal',
//            'home improvement'
        ]
    },
    videos: {},
    pageHome: {
        recentVideos: [],
        featuredVideos: [],
        loaded: false
    },
    pageCategories: {},
    pageVideo: {
        relatedContent: []
    }
}
