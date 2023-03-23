// Models
const User = require("../models/user");
// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");
// Module auth avec passport
const passport = require('passport');
// Module pour le lien entre moongose et passport pour les auth
const passportLocalMongoose = require('passport-local-mongoose')

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
  async signup(req, res, next) {

    const newUser = new User ({
      username: req.body.username
    });

    try {
      //save le user (passport-local-mongoose)
      await User.register(newUser, req.body.password);
      console.log(chalk.bgBlue("{ newUser>>>>>>> }", newUser));
      // Authentification de l'utilisateur nouvellement inscrit
      passport.authenticate("local")(req, res, function() {
        res.render("index");
      });
    } catch (err) {
      console.error(chalk.bgRedBright(err))
      res.send(`l'utilisateur ${newUser.username} n'a pas pu etre inscrit`);
    };
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
