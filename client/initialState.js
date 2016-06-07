const baseSocialIcons = [
    {
        name: 'facebook',
        link: 'https://www.facebook.com/knowsyco'
    },
    {
        name: 'twitter',
        link: 'https://twitter.com/knowsyco'
    },
    {
        name: 'pinterest',
        link: 'https://www.pinterest.com/knowsyco'
    }
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
            {
                name: 'youtube',
                link: null
            },
            {
                name: 'instagram',
                link: 'https://www.instagram.com/knowsyco',
                iconName: 'instagram_round'
            }
        ]),
        socialShareIcons: baseSocialIcons.concat([
            {
                name: 'email',
                link: null,
                iconName: 'mail'
            }

        ]),
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
