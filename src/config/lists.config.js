export const navLinks = [
    { label: 'Home', to: '/home' },
    { label: 'Games', to: '/games' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Contact', to: '/contact' },
]

export const socialMedias = {
    twitter: {
        label: 'Twitter',
        to: 'https://x.com/StructorsStudio',
        img: '/images/icons/twitter_icon.svg',
        color: 'black',
    },
    youtube: {
        label: 'Youtube',
        to: 'https://www.youtube.com/@TheFoundationSurvive',
        img: '/images/icons/youtube_icon.svg',
        color: 'red',
    },
    tiktok: {
        label: 'TikTok',
        to: 'https://www.tiktok.com/@the.foundation.su',
        img: '/images/icons/tik_tok_icon.png',
        color: 'black',
    },
    discord: {
        label: 'Discord',
        to: 'https://t.co/pWaLfMpZCT',
        img: '/images/icons/discord_icon.svg',
        color: '#206de8',
    },
}

export const platforms = {
    steam: {
        name: 'Steam',
        icon: '/images/icons/steam_icon.png',
        color: '#1349a1',
    },
    itchio: {
        name: 'Itchio',
        icon: '/images/icons/itchio_icon.png',
        color: 'red',
    },
    other: {
        name: 'Other',
        icon: '/images/icons/other_icon.png',
        color: 'gray',
    },
}

export const gameStates = Object.freeze({
    published: {
        label: 'Published',
        color: '#2ff56a',
    },
    inprogress: {
        label: 'In Progress',
        color: 'orange',
    },
    canceled: {
        label: 'Canceled',
        color: 'red',
    },
})
