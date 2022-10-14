//libraries
const passport = require('passport')
const googlePassport = require('passport-google-oauth20')
const key = require('./keys')
const User = require('../models/UserSchema')
//serialize the data
passport.serializeUser((user,done)=>{
    done(null,user._id)
})
//deserialize the data

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })   
})
passport.use(new googlePassport({
    //option for the google strategy 
    clientID: key.google.clientID,
    clientSecret:key.google.clientSecret,
    callbackURL:'/auth/google/redirect',


},(accessToken,refreshToken,profile,done)=>{
    // check user is already exist in the database
    User.findOne({googleId:profile.id}).then((CurrentUser)=>{
        if(CurrentUser){
            // The user already exists in the database.
            console.log( 'User is ', CurrentUser)
            done(null,CurrentUser)
        }
        // Create a new user
        else{

        new User({
            username:profile.displayName,
            googleId:profile.id,
            thumbnail:profile._json.picture
        }).save().then((newUser)=>{
            console.log('user created ', newUser)
            done(null,newUser)

        })
        console.log(profile)
    }

    
    })
    // this is the asynchronous its means it take the time and means get the user
    // data and then save it then it must return the promise 
    //  this function is fire when the grab the personal information
    //passport callback function

})) 