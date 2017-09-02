module.exports = {

    db: process.env.MONGODB || process.env.MONGOHQ_URL,

    doubanFilmAPI:'http://localhost:8080/douban/v2/movie/search',

    sessionSecret: process.env.SESSION_SECRET,

    facebook: {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true
    },

    github: {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
    },

    twitter: {
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        token: process.env.TWITTER_TOKEN,
        tokenSecret: process.env.TWITTER_TOKEN_SECRET,
        callbackURL: '/auth/twitter/callback',
        passReqToCallback: true
    },

    google: {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    },

    cookieSecret: process.env.COOKIE_SECRET
};