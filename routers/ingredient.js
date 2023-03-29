const express = require('express');
const { ingredientController } = require('../controller')
const { auth } = require("../service");
const router = express.Router () 


/**
 *  Ingredient 
 * @typedef {object} Ingredient
 * @property {string} name - Nom de l'Ingredient
 * @property {string} bestDish - Titre de l'Ingredient
 * @property {string} quantity - description de l'Ingredient
 * @property {string} user - Utilisateur de l'Ingredient
 * @property {string} receipe - recette de l'Ingredient
 * @property {Date} date - date de l'ajout l'Ingredient
 */

// GET New ingredient Page
router.get("/dashboard/myreceipes/:id/newingredient", auth.isLogged, ingredientController.ingredientPage)

// POST New ingredient form
router.post("/dashboard/myreceipes/:id", auth.isLogged, ingredientController.makeIngredient)

// DELETE ingredient form
router.delete("/dashboard/myreceipes/:id/:ingredientId", auth.isLogged, ingredientController.deleteIngredient)

// POST ingredient form
router.post("/dashboard/myreceipes/:id/:ingredientId/edit", auth.isLogged, ingredientController.updatePageIngredient)

// PUT ingredient form
router.put("/dashboard/myreceipes/:id/:ingredientId", auth.isLogged, ingredientController.updateIngredient)




module.exports = router