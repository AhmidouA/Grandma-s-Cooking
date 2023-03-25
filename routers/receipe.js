const express = require("express");
const { receipeController } = require("../controller");
const { auth } = require("../service");
const router = express.Router();


// GET receipes Page
router.get('/dashboard/myreceipes', auth.isLogged, receipeController.myReceipes)



module.exports=router;