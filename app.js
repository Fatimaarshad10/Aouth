const express = require('express')
const CookieSession = require('cookie-session');
const passport = require('passport')
const paasport1 = require('./config/passport')
const AuthRoute = require('./routes/auth')
const Profile = require('./routes/profile')

const mongoose = require("mongoose");
const key = require('./config/keys')
const app = express()

// we set the view engine ejs embedded js template
app.set("view engine", 'ejs')

app.use(CookieSession({
    maxAge: 24*60*60*1000,
    keys:[key.session.cookie],
}))
//initialize the passport 
app.use(passport.initialize())
app.use(passport.session())
// listen on this port 5000 
mongoose.connect(key.mongodb.MONGO_URL, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', AuthRoute);
app.use('/profile', Profile);


// create home route
app.get('/', (req, res) => {
    res.render('page',{user:req.user});
});

app.listen(5000, () => {
    console.log('app now listening for requests on port 3000');
});
