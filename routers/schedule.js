const express = require('express');
const { scheduleController } = require('../controller')
const {auth} = require('../service')
const router = express.Router()


/**
 *  Schedule 
 * @typedef {object} Schedule
 * @property {string} receipeName - Nom de la recette
 * @property {string} scheduleDate - Programation du plat
 * @property {string} user - Utilisateur de la Programation
 * @property {number} time - le temps de la Programation
 * @property {Date} date - date de l'ajout la programation
 */


/**
 * GET /dashboard/schedule
 * @summary Affiche la vue du planning pour l'utilisateur connecté
 * @security bearerAuth
 * @tags Planning
 * @return {html} 200 - Vue du planning pour l'utilisateur connecté
 */
// GET schedule Page 
router.get('/dashboard/schedule', auth.isLogged, scheduleController.schedulePage)


/**
 * GET /dashboard/schedule/newschedule
 * @summary Affiche la vue pour ajouter un nouveau planning
 * @security bearerAuth
 * @tags Planning
 * @return {html} 200 - Vue pour ajouter un nouveau planning
 */
// GET ADD schedule
router.get('/dashboard/schedule/newschedule', auth.isLogged, scheduleController.AddSchedulePage)


/**
POST /dashboard/schedule
@summary Crée un nouveau planning
@security bearerAuth
@tags Planning
@param {object} request.body - Les informations de la nouvelle planification
@param {string} request.body.receipeName - Le nom de la recette à planifier
@param {string} request.body.scheduleDate - La date de la planification
@param {string} request.body.time - L'heure de la planification
@return {redirect} 200 - Redirige vers la page de planning avec un message de succès si la création de la planification a réussi, sinon redirige vers une page d'erreur
*/
// POST ADD schedule
router.post('/dashboard/schedule', auth.isLogged, scheduleController.makeSchedule)


/**
 * DELETE /dashboard/schedule/{id}
 * @summary Supprime un planning spécifique de l'utilisateur connecté
 * @security bearerAuth
 * @tags Planning
 * @param {string} id.path.required - L'ID du planning à supprimer
 * @return {html} 200 - Message de succès
 * @return {html} 500 - Erreur serveur
 */
// DELETE Favorite
router.delete('/dashboard/schedule/:id', auth.isLogged, scheduleController.deleteSchedule)


module.exports = router