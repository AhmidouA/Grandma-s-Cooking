const express = require('express');
const {favoriteController} = require('../controller')
const {auth} = require('../service')
const router = express.Router()

// GET Favorite Page 
router.get('/dashboard/favorites', auth.isLogged, favoriteController.favoritePage)


// GET ADD Favorite
router.get('/dashboard/favorites/newfavourite', auth.isLogged, favoriteController.AddFavoritePage)



module.exports = router