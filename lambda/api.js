const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github").Strategy;
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const router = require("./app/router");
const config = require("./app/config");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new GitHubStrategy(
        {
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL:
                "https://dev--developer-gov-sg.netlify.com/.netlify/functions/api/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                // refresh token won't be use as of now, will prompt user to relogin when token expires
                profile.accessToken = accessToken;
                return done(null, profile);
            });
        }
    )
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// session for passport
app.use(
    session({
        secret: "cats",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/.netlify/functions/api", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
