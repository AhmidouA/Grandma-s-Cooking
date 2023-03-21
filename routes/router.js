const express = require("express");
// Models
const User = require('../models/user')
const router = express.Router()


// Home page
router.get('/', (req,res) => {
    res.render("index")
});




module.exports =router;