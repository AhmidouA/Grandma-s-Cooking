const express = require("express");
const { receipeController } = require("../controller");
const { auth } = require("../service");
const router = express.Router();

/**
 *  Receipe 
 * @typedef {object} Receipe
 * @property {string} name - Nom de la recette
 * @property {string} image - image de la recette
 * @property {string} user - Utilisateur de la recette
 */


/**
 * GET /dashboard/myreceipes
 * @summary Affiche toutes les recettes d'un utilisateur
 * @security bearerAuth
 * @tags Recettes
 * @return {html} 200 - Renvoie la page des recettes de l'utilisateur
 * @return {html} 500 - Erreur inattendue
 */
// GET receipes Page
router.get('/dashboard/myreceipes', auth.isLogged, receipeController.myReceipes)


/**
 * GET /dashboard/newreceipe
 * @summary Affiche la vue pour créer une nouvelle recette
 * @security bearerAuth
 * @tags Recettes
 * @return {html} 200 - Vue pour créer une nouvelle recette
 */
// GET new Receipe Page
router.get('/dashboard/newreceipe', auth.isLogged, receipeController.newReceipe)


/**

POST /dashboard/newreceipe
@summary Crée une nouvelle recette
@security bearerAuth
@tags Recettes
@param {string} request.body..receipe - Nom de la nouvelle recette
@param {string} request.body..logo - URL de l'image de la nouvelle recette
@return {html} 302 - Redirige vers la liste des recettes de l'utilisateur
@throws {html} 500 - Erreur serveur
*/
// Post Add new Receipe Page
router.post('/dashboard/newreceipe', auth.isLogged, receipeController.makeReceipe)


/**
GET /dashboard/myreceipes/:id
@summary Affiche les ingrédients d'une recette spécifique
@security bearerAuth
@tags Recettes
@param {string} id.path - L'ID de la recette à afficher
@return {html} 200 - Vue contenant les ingrédients de la recette spécifiée
@throws {html} - Erreur serveur
*/
// GET receipe by Id
router.get("/dashboard/myreceipes/:id", auth.isLogged, receipeController.receipeById)


/**
DELETE /dashboard/myreceipes/:id
@summary Supprime une recette
@security bearerAuth
@tags Recettes
@param {string} id.path - L'identifiant de la recette à supprimer
@return {html} 200 - Redirige vers la liste des recettes de l'utilisateur connecté
@throws {html} - Erreur serveur
*/
// DELETE receipe by id 
router.delete("/dashboard/myreceipes/:id",  auth.isLogged, receipeController.deleteReceipe)

module.exports=router;