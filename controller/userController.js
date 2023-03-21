// Models
const User = require("../models/user");
// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

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
  signup(req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
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
  login(req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(chalk.bgBlue("{ user.username>>>>>>> }", user.username));
    console.log(chalk.bgBlue("{ user.password>>>>>>> }", user.password));


    User.findOne({ username: user.username })
      .then((foundUser) => {
        if (foundUser) {
          console.log("{ foundUser>>>>>>> }", foundUser.username);
          if (foundUser.password === req.body.password) {
            res.render("index");
          }
        } else {
          res.send(`l'utilisateur ${user.username} n'exste pas`);
          console.log(chalk.red((`L'user n'existe pas ${user.username}`)));
        }
      })
      .catch((err) => {
        console.error((chalk.bgRedBright(err)));
      });
  },
};

module.exports = userController;
