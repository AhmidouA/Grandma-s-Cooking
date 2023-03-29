const express = require('express');
const {favoriteController} = require('../controller')
const {auth} = require('../service')
const router = express.Router()


router.get('/dashboard/favorites', auth.isLogged, favoriteController.favoritePage)



module.exports = router