// Models
const User = require("../models/user");
// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");
// hacher le mot de passe
const bcrypt = require("bcrypt");

const userController = {
  // module Home Page
  homePage(req, res) {
    res.render("index");
  },

  //module signUp Page
  indexSignupPage(req, res) {
    res.render("signup");
  },

  //module sinUp (form)
  async signup(req, res) {

    const hash = await bcrypt.hash(req.body.password, 10)

    console.log(chalk.bgBlue("{ hash>>>>>>> }", hash));
    const user = {
      username: req.body.username,
      password: hash,
    };
    console.log(chalk.bgBlue("{ user.username>>>>>>> }", user.username));

    // Vérifier si le username existe déja dans la bdd
    const existingUser = await User.findOne({username: user.username});
    if (existingUser) {
      console.log(chalk.red(`Le username est déjà utilisé: ${user.username}`));
      res.send(`Le username est déjà utilisé: ${user.username}`)
    }

    try {
      await User.create(user)
      console.log(chalk.bgBlue(`l'utilisateur ${user.username} a bien été inscrit `));
      res.render("index")
    } catch (err) {
      console.error(chalk.bgRedBright(err))
      res.send(`l'utilisateur ${user.username} n'a pas pu etre inscrit`);

    }
  },

  //module login Page
  indexLoginPage(req, res) {
    res.render("Login");
  },

  //module login(form)
  async login(req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(chalk.bgBlue("{ user.username>>>>>>> }", user.username));
    console.log(chalk.bgBlue("{ user.password>>>>>>> }", user.password));
  
    try {
      const foundUser = await User.findOne({ username: user.username });
      console.log(chalk.bgYellow("{ foundUser.username>>>>>>> }", foundUser.username));

      const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
      if (!passwordMatch) {
        res.send("Le mot de passe ou l'utilisateur est incorrect");
        console.log(chalk.bgYellow(`Le mot de passe ou l'utilisateur est incorrect: user:${user.username}`));      
        } 
        return res.render('index');
    } catch (err) {
      console.error(chalk.bgRedBright(err))
      res.send(`l'utilisateur ${user.username} n'exste pas`);
    }
  }
};

module.exports = userController;
