// Models User
const User = require("../models/user");
// Models REst
const Reset = require("../models/reset");

// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

// Module auth avec passport
const passport = require('passport');
// Module pour le lien entre moongose et passport pour les auth
const passportLocalMongoose = require('passport-local-mongoose')

// module rand-token
const  randToken = require('rand-token')
// module nodmailer
const { mail } = require("../service");

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
  async login(req, res, next) {
    const user = new User ({
      username: req.body.username,
      password: req.body.password
    })
    console.log(chalk.bgBlue("{ user.username>>>>>>> }", user.username));
    console.log(chalk.bgBlue("{ user.password>>>>>>> }", user.password));
  
    try {
      // je lui donne un callback vide car la methode login de passport attend un callback
      await req.login(user, () => {}); 
      console.log(chalk.bgYellow("{ foundUser.username>>>>>>> }", user));

      // Authentification de l'utilisateur nouvellement inscrit
      passport.authenticate("local")(req, res, function() {
        res.redirect("/dashboard");
      });

    } catch (err) {
      console.error(chalk.bgRedBright(err))
      res.send(`l'utilisateur ${user.username} n'exste pas`);
    }
  },

  // module profile
  profile (req, res) {
    res.render('dashboard')
  },

  // module forgot Page 
  forgotPassword(req,res){
    res.render('forgot')
  }, 

  //module forgot page (form)
  async sendPasswordResetEmail (req, res){
    const username = req.body.username
    console.log(chalk.bgCyan("{ username>>>>>>> }", username));

  try {

    const user = await User.findOne({username: username})
    console.log(chalk.bgBlue("{ User.username>>>>>>> }", User.username));

    // vérification si l'utilisateur existe
    if (!user) {
      throw new Error(`l'utilisateur ${username} n'a pas été trouvé`)
    }

    // génération de token
    const token = randToken.generate(16)
    console.log(chalk.bgCyan("{ token>>>>>>> }", token));
    
    const reset = await Reset.create({
      username: username,
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 600000 // 600000 milliseconds = 10min
    })

    console.log(chalk.bgBlue("{ Reset.username>>>>>>> }", reset.username));
    console.log(chalk.bgCyan("{ Reset.resetPasswordToken>>>>>>> }", reset.resetPasswordToken));
    console.log(chalk.bgBlue("{ Reset.resetPasswordExpires>>>>>>> }", reset.resetPasswordExpires));

    // l'envoi du mail avec les deux params l'utilisateur et le token
    await mail.sendPasswordResetEmail(user, token)
    

    res.redirect('/login')

      } catch (err) {
    console.error(chalk.bgRedBright(err))
    console.error(chalk.bgRedBright(`l'utilisateur ${username} n'a pas été trouvé`));
    res.redirect('/signup')
    }
  },

  // Module reset page
  async resetPasswordIndexPage (req, res) {
    // le token en params de l'API
    const token = req.params.token
    console.log(chalk.bgBlue("{ token>>>>>>> }", token));


    try {
    const reset = await Reset.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {$gt: Date.now()} // token supprieur a la date (l'heure) de maintenant (=> non expiré)
      })
      console.log(chalk.bgBlue("{ resetPasswordToken>>>>>>> }", reset.resetPasswordToken));
      console.log(chalk.bgYellowBright("{ resetPasswordExpires>>>>>>> }", reset.resetPasswordExpires));

      if (!reset) {
        throw new Error(`le Token de l'utilisateur a expiré`)
      }
      res.render('/reset', {token: token})

    } catch (err) {
      console.error(chalk.bgRedBright(err))
      console.error(chalk.bgRedBright(`le Token de l'utilisateur a expiré`));
      res.redirect('/login')
    }

  },

  // module logout
  logout (req, res) {
    // methode logout (passport)
    // je lui donne aussi un callback vide car la methode logout de passport attend un callback
    req.logout(() => {})
    res.redirect("/login")
  }
};

module.exports = userController;
