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



/**
GET /dashboard/myreceipes/:id/newingredient
@summary Affiche la page pour ajouter un nouvel ingrédient à une recette
@security bearerAuth
@tags Recettes
@param {string} id.path - ID de la recette
@return {html} 200 - Retourne la page pour ajouter un nouvel ingrédient à une recette
@return {object} 500 - Erreur inattendue
*/
// GET New ingredient Page
router.get("/dashboard/myreceipes/:id/newingredient", auth.isLogged, ingredientController.ingredientPage)


/**
 * POST /dashboard/myreceipes/:id
 * @summary Ajoute un nouvel ingrédient à une recette
 * @security bearerAuth
 * @tags Ingrédients
 * @param {string} request.body.name.required - Nom de l'ingrédient
 * @param {string} request.body.bestDish.required- Meilleur plat pour utiliser cet ingrédient
 * @param {number} request.body.quantity.required - Quantité de l'ingrédient
 * @return {html} 302 - Redirige vers la page de la recette
 * @return {html} 500 - Erreur inattendue
 */
// POST New ingredient form
router.post("/dashboard/myreceipes/:id", auth.isLogged, ingredientController.makeIngredient)


/**
 * DELETE /dashboard/myreceipes/{id}/{ingredientId}
 * @summary Supprime un ingrédient d'une recette
 * @security bearerAuth
 * @tags Ingrédients
 * @param {string} id.path.required - Id de la recette
 * @param {string} ingredientId.path.required - Id de l'ingrédient à supprimer
 * @return {html} 200 - Redirige vers la page de la recette dont l'ingrédient a été supprimé
 * @return {html} 500 - Erreur inattendue
 */
// DELETE ingredient form
router.delete("/dashboard/myreceipes/:id/:ingredientId", auth.isLogged, ingredientController.deleteIngredient)


/**
POST /dashboard/myreceipes/:id/:ingredientId/edit
@summary Affiche la page d'édition d'un ingrédient d'une recette
@security bearerAuth
@tags Ingrédients
@param {string} id.path.required - Id de la recette
@param {string} ingredientId.path.required - Id de l'ingrédient à éditer
@return {html} 200 - Page d'édition de l'ingrédient
@return {html} 500 - Erreur inattendue
*/
// POST ingredient form
router.post("/dashboard/myreceipes/:id/:ingredientId/edit", auth.isLogged, ingredientController.updatePageIngredient)


/**
 * PUT /dashboard/myreceipes/:id/:ingredientId
 * @summary Met à jour un ingrédient d'une recette
 * @security bearerAuth
 * @tags Ingrédients
 * @param {string} id.path.required - Id de la recette
 * @param {string} ingredientId.path.required - Id de l'ingrédient à modifier
 * @param {string} request.body.ingredient.required - Objet représentant l'ingrédient avec les nouvelles valeurs
 * @param {string} request.body.name.required - Nouveau nom de l'ingrédient
 * @param {string} request.body.bestDish.required - Nouveau meilleur plat pour utiliser cet ingrédient
 * @param {number} request.body.quantity.required- Nouvelle quantité de l'ingrédient
 * @return {html} 302 - Redirige vers la page de la recette dont l'ingrédient a été modifié
 * @return {html} 500 - Erreur inattendue
 */
// PUT ingredient form
router.put("/dashboard/myreceipes/:id/:ingredientId", auth.isLogged, ingredientController.updateIngredient)


module.exports = router