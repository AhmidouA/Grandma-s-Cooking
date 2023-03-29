// Models
const { Receipe } = require("../models");
const { Ingredient } = require("../models");

// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const receipeController = {
  //module mes recettes
  async myReceipes(req, res) {
    const userId = req.user.id;
    console.log(chalk.bgBlue("{ userId }>>>>>>", userId));

    try {
      const receipe = await Receipe.find({ user: userId });
      //   console.log(chalk.bgCyan("{ receipe }>>>>>>", receipe + JSON.stringify()));

      res.render("receipe", { receipe: receipe });
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(
        chalk.bgRedBright(
          `le Token de l'utilisateur avec l'id, n'a pas été trouvé`
        )
      );
    }
  },

  // module nouvelle recette
  newReceipe(req, res) {
    res.render("newreceipe");
  },

  // module nouvelle recette
  async makeReceipe(req, res) {
    const name = req.body.receipe;
    console.log(chalk.bgBlue("{ name }>>>>>>", name));
    const image = req.body.logo;
    console.log(chalk.bgCyan("{ image }>>>>>>", image));
    const userId = req.user.id;
    console.log(chalk.bgBlue("{ userId }>>>>>>", userId));

    try {
      const AddReceipe = await Receipe.create({
        name: name,
        image: image,
        user: userId,
      });
      console.log(chalk.bgYellow("{ AddReceipe }>>>>>>", AddReceipe));

      req.flash("success", "Votre recette à bien été ajouté");
      res.redirect("/dashboard/myreceipes");
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`la nouvelle n'a pas pu etre ajoutée `));
    }
  },

  // module recette par id
  async receipeById(req, res) {
    const userId = req.user.id;
    console.log(chalk.blue("{ userId }>>>>>>", userId));
    const receipeUserId = req.params.id;
    console.log(chalk.cyan("{ receipeUserId }>>>>>>", receipeUserId));

    try {
      const receipe = await Receipe.findOne({
        user: userId,
        _id: receipeUserId,
      });
      console.log(chalk.green("{ receipe }>>>>>>", receipe));

      const ingredient = await Ingredient.find({
        user: userId,
        receipe: receipeUserId,
      });
      console.log(
        chalk.magenta("{ ingredient }>>>>>>", JSON.stringify(ingredient))
      );
      res.render("ingredients", { ingredient: ingredient, receipe: receipe });
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`Utilisateur non identifié `));
    }
  },

  //module delete par id
  async deleteReceipe(req, res) {
    const userId = req.user.id;
    console.log(chalk.blue("{ userId }>>>>>>", userId));
    const receipeId = req.params.id;
    console.log(chalk.cyan("{ receipeId }>>>>>>", receipeId));

    try {
      const deleteReceipe = await Receipe.deleteOne({ _id: receipeId });
      console.log(chalk.green("{ deleteReceipe }>>>>>>", deleteReceipe));

      req.flash("success", "La recette a bien été supprimée");
      res.redirect("/dashboard/myreceipes");
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`la recette n'a pas pu etre supprimée `));
    }
  },
};

module.exports = receipeController;
