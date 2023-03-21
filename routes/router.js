const express = require("express");
// Models
const User = require('../models/user')
const router = express.Router()


// Home page
router.get('/', (req,res) => {
    res.render("index")
});



// signUp Page
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    User.create(user).then((result)=>{
        res.render("index")
    }).catch((err) => {
        console.error(err)
    })
})



module.exports =router;