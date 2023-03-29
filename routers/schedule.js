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


// GET schedule Page 
router.get('/dashboard/schedule', auth.isLogged, scheduleController.schedulePage)

// GET ADD schedule
router.get('/dashboard/schedule/newschedule', auth.isLogged, scheduleController.AddSchedulePage)

// POST ADD schedule
router.post('/dashboard/schedule', auth.isLogged, scheduleController.makeSchedule)

// DELETE Favorite
router.delete('/dashboard/schedule/:id', auth.isLogged, scheduleController.deleteSchedule)





module.exports = router