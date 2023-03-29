// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");
// Module Flash message middleware for Connect.
const flash = require("connect-flash");

const auth = {
  isLogged(req, res, next) {
    // methode passport
    if (!req.isAuthenticated()) {
      req.flash("error", "Vous devez vous connecter d'abord");
      res.redirect("/login");
    }
    next();
  },

   // middleware d'erreur 404
   notFound(req, res, next) {
    // Instance de error
    const error = new Error(`La page demandée est ${req.url}`);
    error.status = 500;

    res.render('500');

    next(console.error(error));
  },

};

module.exports = auth;
