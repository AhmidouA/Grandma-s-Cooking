/********************************/
/**** Configuration express  ****/
/********************************/

const express = require("express");
const app = express();
const path = require('path');

// module dotenv
require("dotenv").config();
// module pour le body
const bodyParser = require("body-parser");
// Module ejs (pour les views)
const ejs = require("ejs");
// Module moongose
const mongoose = require("mongoose");

// Module auth avec passport
const passport = require("passport");
// Module pour le lien entre moongose et passport pour les auth
const passportLocalMongoose = require("passport-local-mongoose");

// midlleware error
const {auth} = require("./service");

// router
const { userRouter, receipeRouter, ingredientRouter, favoriteRouter, scheduleRouter } = require("./routers");
// Models User
const User = require("./models/user");

// middleware Session
const session = require("express-session");
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET,
  })
);

// Passport
app.use(passport.initialize());
// lien entre les session et le passport
app.use(passport.session());

// connect BDD mongoDb
mongoose.connect(process.env.MGDBURL);

// initaliser la strategy (Passport pour gérer nous auth et request)
// PASSPORT LOCAL MOONGOSE
passport.use(User.createStrategy());

// accées a les info (cookies,...)
passport.serializeUser(User.serializeUser());
// détruit a les info (cookies,...)
passport.deserializeUser(User.deserializeUser());


// middleware favicon
const favicon = require('serve-favicon');
// PORT
const PORT = process.env.PORT ?? 3000;
// Public
app.use(express.static("public"));
// Définir le chemin d'accès l'image favicon.ico
app.use(favicon(path.join("./public/images/favicon.ico")));
//EJS
app.set("view engine", "ejs");

// Body Parcer
app.use(bodyParser.urlencoded({ extended: false }));


// Module Flash message middleware for Connect.
const flash = require("connect-flash");
// Module Flash message middleware for Connect.
app.use(flash())
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success")
  next();
})


// Module method-override (methode)
const methodOverride = require("method-override");
// override with POST having ?_method=DELETE => pour les methode
app.use(methodOverride('_method'))

app.use(userRouter, receipeRouter, ingredientRouter, favoriteRouter, scheduleRouter);

/****************************/
/**** Swagger generator  ****/
/****************************/
const expressJSDocSwagger = require('express-jsdoc-swagger');
const options = {
  info: {
      version: '1.0.0',
      title: 'Grandma\'s Cooking',
      description : 'The Api endpoint of Cooking',
      license: {
          name: 'Cooking Project',
      },
  },
  security: {
      bearerAuth: {
          type: 'http',
          scheme: 'bearer',
      },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
};

expressJSDocSwagger(app)(options);


// middleware 500
app.use(auth.notFound);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
