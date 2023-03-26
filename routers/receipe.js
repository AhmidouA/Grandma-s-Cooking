const express = require("express");
const { receipeController } = require("../controller");
const { auth } = require("../service");
const router = express.Router();


// GET receipes Page
router.get('/dashboard/myreceipes', auth.isLogged, receipeController.myReceipes)


// GET new Receipe Page
router.get('/dashboard/newreceipe', auth.isLogged, receipeController.newReceipe)


// POST Add new Receipe
router.post('/dashboard/newreceipe', auth.isLogged, receipeController.makeReceipe)

// GET
router.get("/dashboard/myreceipes/:id", auth.isLogged, receipeController.receipeById)



module.exports=router;