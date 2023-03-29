const express = require('express');
const { scheduleController } = require('../controller')
const {auth} = require('../service')
const router = express.Router()

// GET Favorite Page 
router.get('/dashboard/shedule', auth.isLogged, scheduleController.schedulePage)





module.exports = router