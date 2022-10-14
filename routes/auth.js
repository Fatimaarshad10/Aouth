const router = require('express').Router()
const passport = require('passport')
//login route

router.get('/login',(req,res)=>{
    res.render('login',{user: req.user})
})
//google route
router.get('/google',passport.authenticate('google',{
    scope:['profile']

}))
//call back google redirect 
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/')
})
//logout route
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
module.exports = router