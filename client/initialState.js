export default {
    user: {},
    categories: [],
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
//            { name: 'tech & digital', link: 'tech-digital' },
//            { name: 'social media', link: 'social-media' },
//            { name: 'health & wellness', link: 'health-wellness' },
//            { name: 'drinks & entertaining', link: 'drinks-entertaining' },
//            { name: 'sex & relationships', link: 'sex-relationships' },
//            { name: 'career & workplace', link: 'career-workplace' },
//            { name: 'style & beauty', link: 'style-beauty' },
//            { name: 'home', link: 'home' }
//            'parenting',
//            'pets',
//            'travel',
//            'finance & investing',
//            'legal',
//            'home improvement'
        ],
        currentVideoStatus: null,
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
