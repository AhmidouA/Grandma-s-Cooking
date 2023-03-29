// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const { Favorite } = require("../models");

const favoriteController = {
  //module favorite Page
  async favoritePage(req, res) {
    const userId = req.user.id;
    console.log(chalk.blue("{ userId }>>>>>>", userId));

    try {
      const favorite = await Favorite.find({ user: userId });
      console.log(chalk.green("{ favorite }>>>>>>", favorite));
      res.render("favorites", { favorite: favorite });
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(
        chalk.bgRedBright(`les favoris n'ont pas pu etre récupéré`)
      );
      res.render("500");
    }
  },

  //module Add favorite
  AddFavoritePage(req, res) {
    res.render("newfavorite");
  },

  //module Add favorite (Form)
  async makeFavorite(req, res) {
    const image = req.body.image;
    console.log(chalk.blue("{ image }>>>>>>", image));
    const title = req.body.title;
    console.log(chalk.cyan("{ title }>>>>>>", title));
    const description = req.body.description;
    console.log(chalk.blue("{ description }>>>>>>", description));
    const userId = req.user.id;
    console.log(chalk.blue("{ userId }>>>>>>", userId));

    try {
      const AddFavorite = await Favorite.create({
        image: image,
        title: title,
        description: description,
        user: userId,
      });
      console.log(chalk.bgGreen("{ AddFavorite }>>>>>>", AddFavorite));

      req.flash("success", "Votre favori à bien été ajouté");
      res.redirect("/dashboard/favorites");
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le favori n'a pas pu etre récupéré`));
      res.render("500");
    }
  },

  //module delete fav
  async deleteFavorite(req, res) {
    const userId = req.user.id;
    console.log(chalk.blue("{ userId }>>>>>>", userId));
    const favoriteId = req.params.id;
    console.log(chalk.cyan("{ favoriteId }>>>>>>", favoriteId));

    try {
      const deleteFavorite = await Favorite.deleteOne({ _id: favoriteId });
      console.log(chalk.bgGreen("{ deleteFavorite }>>>>>>", deleteFavorite));

      req.flash("success", "Le favoris a bien été supprimé");
      res.redirect("/dashboard/favorites");
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le favori a bien été supprimé`));
      res.render("500");
    }
  },
};

module.exports = favoriteController;
