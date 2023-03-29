const express = require('express');
const {favoriteController} = require('../controller')
const {auth} = require('../service')
const router = express.Router()

// GET Favorite Page 
router.get('/dashboard/favorites', auth.isLogged, favoriteController.favoritePage)

// GET ADD Favorite
router.get('/dashboard/favorites/newfavorite', auth.isLogged, favoriteController.AddFavoritePage)

// POST ADD Favorite
router.post('/dashboard/favorites', auth.isLogged, favoriteController.makeFavorite)



module.exports = router