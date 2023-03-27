// Models
const { Receipe } = require("../models");
const { Ingredient } = require("../models");

// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const ingredientController = {

    async ingredientPage (req, res) {
        const receipeId = req.parmas.id
        console.log(chalk.blue("{ receipeId }>>>>>>", receipeId));

        try {
            const receipe = await Receipe.findById({_id :receipeId });
            console.log(chalk.cyan("{ receipe }>>>>>>", receipe));
            res.render("newingredient", {receipe: receipe})

        } catch (err) {
        console.error(chalk.bgRedBright(err));
        console.error(chalk.bgRedBright(`la recette avec l'id ${receipeId} n'a pas été trouvé`));
        
        }      
    }
};

module.exports = ingredientController