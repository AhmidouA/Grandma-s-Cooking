const express = require('express');
const {favoriteController} = require('../controller')
const {auth} = require('../service')
const router = express.Router()


/**
 *  favorite 
 * @typedef {object} favorite
 * @property {string} image - Image du favoris
 * @property {string} title - Titre du favoris
 * @property {string} description - description du favoris
 * @property {string} user - Utilisateur du favoris
 * @property {Date} date - date du favoris
 */

/**
 * GET /dashboard/favorites
 * @summary Affiche la page des favoris de l'utilisateur connecté
 * @security bearerAuth
 * @tags Favoris
 * @return {html} 200 - Retourne la page des favoris avec la liste des favoris de l'utilisateur connecté
 * @return {object} 500 - Erreur inattendue
 */
// GET Favorite Page 
router.get('/dashboard/favorites', auth.isLogged, favoriteController.favoritePage)


/**
 * GET /dashboard/favorites/newfavorite
 * @summary Affiche la page pour ajouter un favori
 * @security bearerAuth
 * @tags Favoris
 * @return {html} 200 - Retourne la page pour ajouter un favori
 * @return {object} 500 - Erreur inattendue
 */
// GET ADD Favorite
router.get('/dashboard/favorites/newfavorite', auth.isLogged, favoriteController.AddFavoritePage)


/**
 * POST /dashboard/favorites
 * @summary Ajoute un nouveau favori pour l'utilisateur connecté
 * @security bearerAuth
 * @tags Favoris
 * @param {string} request.body.image.required - L'image du favori à ajouter
 * @param {string} request.body.title.required - Le titre du favori à ajouter
 * @param {string} request.body.description.required  - La description du favori à ajouter
 * @return {html} 200 - Redirige l'utilisateur vers la page des favoris après l'ajout du favori
 * @return {object} 500 - Erreur inattendue
 */
// POST ADD Favorite
router.post('/dashboard/favorites', auth.isLogged, favoriteController.makeFavorite)


/**
 * DELETE /dashboard/favorites/{id}
 * @summary Supprime le favori correspondant à l'ID fourni
 * @security bearerAuth
 * @tags Favoris
 * @param {string} id.path.required - ID du favori à supprimer
 * @return {html} 200 - Retourne un message de succès indiquant que le favori a été supprimé
 * @return {object} 500 - Erreur inattendue
 *//
// DELETE Favorite
router.delete('/dashboard/favorites/:id', auth.isLogged, favoriteController.deleteFavorite)



module.exports = router