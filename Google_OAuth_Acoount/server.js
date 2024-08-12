const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(express.static('public'));

// Session setup
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '694708838705-3u5eb5hkh9r1lv1rs7ncbqonaopbcqpq.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you would save the user to your database
    // For now, we'll just return the profile
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  });

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.redirect('/');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
