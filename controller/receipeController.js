// Models
const { Receipe } = require("../models");

// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const receipeController = {
  //module mes recettes
  myReceipes(req, res) {
    const id = req.params.id;
    console.log(chalk.bgBlue("{ id }>>>>>>", id));

    try {
      const receipe = Receipe.findOne({ user: id });
      console.log(chalk.bgCyan("{ receipe }>>>>>>", receipe));


      res.render("receipe", {receipe:receipe});
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le Token de l'utilisateur avec l'id ${id}, n'a pas été trouvé`));
    }
  },
};

module.exports = receipeController;
