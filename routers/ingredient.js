const express = require('express');
const { ingredientController } = require('../controller')
const { auth } = require("../service");
const router = express.Router () 


// GET New ingredient Page
router.get("/dashboard/myreceipes/:id/newingredient", auth.isLogged, ingredientController.ingredientPage)

// POST New ingredient form
router.post("/dashboard/myreceipes/:id", auth.isLogged, ingredientController.makeIngredient)

// DELETE ingredient form
router.delete("/dashboard/myreceipes/:id/:ingredientId", auth.isLogged, ingredientController.deleteIngredient)

// DELETE ingredient form
router.post("/dashboard/myreceipes/:id/:ingredientId/edit", auth.isLogged, ingredientController.updateIngredient)




module.exports = router