const express = require("express");
// Models
const User = require('../models/user')
const router = express.Router()


// Home page
router.get('/', (req,res) => {
    res.render("index")
});

// signUp 
router.get('/signup', (req, res) => {
    res.render('signup')
})




module.exports =router;