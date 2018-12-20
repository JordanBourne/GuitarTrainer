const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const app = express();

dotenv.config();

const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
},
function (accessToken, refreshToken, extraParams, profile, callback) {
    return callback(null, profile);
});

const sess = {
  secret: 'MYRANDOMSECRET', // Set in .env eventually
  cookie: {},
  resave: false,
  saveUninitialized: true
};

app.use(session(sess));
  
passport.use(strategy);
passport.serializeUser((user, callback) => {
    return callback(null, user);
});

passport.deserializeUser((user, callback) => {
    return callback(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./src/api'));

app.listen(3000);

// TODO: Use jwtAuthz for scoped permissions