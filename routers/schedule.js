const express = require('express');
const { scheduleController } = require('../controller')
const {auth} = require('../service')
const router = express.Router()

// GET schedule Page 
router.get('/dashboard/schedule', auth.isLogged, scheduleController.schedulePage)

// GET ADD schedule
router.get('/dashboard/schedule/newschedule', auth.isLogged, scheduleController.AddSchedulePage)





module.exports = router