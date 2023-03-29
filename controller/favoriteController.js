// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const { Favorite } = require('../models')


const favoriteController = {
    //module favorite Page
    async favoritePage (req, res) {
        const userId = req.user.id;
        console.log(chalk.blue("{ userId }>>>>>>", userId));

        try {
            const favorite = await Favorite.find({user: userId});
            console.log(chalk.green("{ favorite }>>>>>>", favorite));
            res.render('favorites', {favorite: favorite});

        } catch (err) {
            console.error(chalk.bgRedBright(err));
            console.error(chalk.bgRedBright(`les favoris n'ont pas pu etre récupéré`));
        }

    },
    
    //module Add favorite
    AddFavoritePage (req, res) {
        res.render('newFavorites')
    }

};


module.exports = favoriteController