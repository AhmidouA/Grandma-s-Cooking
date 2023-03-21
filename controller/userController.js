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
    console.log(chalk.bgBlue("{ user>>>>>>> }", user.username));

    User.create(user)
      .then((result) => {
        res.render("index");
      })
      .catch((err) => {
        console.error(err);
      });
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
      if (passwordMatch) {
        console.log(chalk.bgYellow("{ user.username>>>>>>> }", user.username));
         return res.render('index');
        } else {
            throw new Error("Le mot de passe est incorrect.");
        }

    } catch (err) {
      console.error(chalk.bgRedBright(err))
      res.send(`l'utilisateur ${user.username} n'exste pas`);
    }
  }
};

module.exports = userController;
