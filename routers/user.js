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


// Login Page
router.get("/login", (req, res) => {
    res.render("login")
})



router.post("/login", (req, res) => {

    const user = {
        username: req.body.username,
        password: req.body.password
    }


    User.findOne({username: user.username}).then((foundUser)=>{
        if (foundUser) {
            console.log("{ foundUser>>>>>>> }", foundUser.username)
            if (foundUser.password === req.body.password){
                res.render('index')
            } 
        }else {
            res.send(`l'utilisateur ${user.username} n'exste pas`)
            console.log(`L'user n'existe pas ${user.username}`)
        }
    }).catch((err)=>{
        console.error(err)
    })

})




module.exports =router;