// Models
const { Receipe } = require("../models");
const { Ingredient } = require("../models");

// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const ingredientController = {

    //module ingredient page
    async ingredientPage (req, res) {
        const receipeId = req.params.id
        console.log(chalk.blue("{ receipeId }>>>>>>", receipeId));

        try {
            const receipe = await Receipe.findById({_id :receipeId });
            console.log(chalk.cyan("{ receipe }>>>>>>", receipe));
            res.render("newingredient", {receipe: receipe})

        } catch (err) {
        console.error(chalk.bgRedBright(err));
        console.error(chalk.bgRedBright(`la recette avec l'id ${receipeId} n'a pas été trouvé`));
        
        }      
    },

    //module ingredient page (form)
    async makeIngredient(req, res){
        const name = req.body.name
        console.log(chalk.blue("{ name }>>>>>>", name));
        const bestDish = req.body.bestDish
        console.log(chalk.cyan("{ bestDish }>>>>>>", bestDish));
        const quantity = req.body.quantity
        console.log(chalk.blueBright("{ quantity }>>>>>>", quantity));
        const userId = req.user.id
        console.log(chalk.cyanBright("{ userId }>>>>>>", userId));
        const receipeId = req.params.id
        console.log(chalk.blue("{ receipeId }>>>>>>", receipeId));

        try {
            const ingredient = await Ingredient.create({
                name: name, 
                bestDish: bestDish, 
                user: userId, 
                quantity: quantity, 
                receipe: receipeId
            })
            console.log(chalk.green("{ ingredient }>>>>>>", ingredient));

            req.flash("success", "Votre ingrédient à bien été ajouté")
            res.redirect("/dashboard/myreceipes/" + receipeId)

        } catch (err) {
        console.error(chalk.bgRedBright(err));
        console.error(chalk.bgRedBright(`les ingrédients n'ont pas pu étre insérée `));
        }
    },

    
    //module delete ingredient
    deleteIngredient (req, res){
        
    }
};

module.exports = ingredientController