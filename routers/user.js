const express = require("express");
const { userController } = require("../controller");
const router = express.Router()


// GET Home page
router.get('/', userController.homePage)

// GET signUp Page
router.get('/signup', userController.indexSignupPage)

// POST signUp Page
router.post('/signup', userController.signup)

// GET Login Page
router.get("/login", userController.indexLoginPage)

// POST Login Page
router.post("/login", userController.login)

// GET Dashboard Page
router.get("/dashboard", userController.profile)

// GET Logout Page
router.get("/logout", userController.logout)

//GET /profile/forgot-password - route pour avoir le formulaire mot de passe oublié
router.get("/forgot", userController.forgotPasswordIndexPage);


module.exports =router;