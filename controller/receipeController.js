// Models
const { Receipe } = require("../models");

// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const receipeController = {
  //module mes recettes
  async myReceipes(req, res) {
    const userId = req.user.id;
    console.log(chalk.bgBlue("{ userId }>>>>>>", userId));

    try {
      const receipe = await Receipe.findOne({ user: userId });
    //   console.log(chalk.bgCyan("{ receipe }>>>>>>", receipe + JSON.stringify()));


      res.render("receipe", {receipe:receipe});
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le Token de l'utilisateur avec l'id, n'a pas été trouvé`));
    }
  },

  // module nouvelle recette
  newReceipe (req, res) {
    res.render('newreceipe')

  },

};

module.exports = receipeController;
