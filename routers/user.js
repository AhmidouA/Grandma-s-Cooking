const express = require("express");
const { userController } = require("../controller");
const router = express.Router();

// GET Home page
router.get("/", userController.homePage);

// GET signUp Page
router.get("/signup", userController.indexSignupPage);

// POST signUp Page (form)
router.post("/signup", userController.signup);

// GET Login Page
router.get("/login", userController.indexLoginPage);

// POST Login Page (form)
router.post("/login", userController.login);

// GET Dashboard Page
router.get("/dashboard", userController.profile);

// GET Logout Page
router.get("/logout", userController.logout);

//GET forgot Page
router.get("/forgot", userController.forgotPassword);

//POST forgot Page (form)
router.post("/forgot", userController.sendPasswordResetEmail);

// GET reset page
router.get("/reset/:token", userController.resetPasswordIndexPage);

// POST reset page (form)
router.post("/reset/:token", userController.resetPassword);

module.exports = router;
