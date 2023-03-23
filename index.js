const express = require("express");
const app = express();

// module dotenv
require("dotenv").config();
// module pour le body
const bodyParser = require("body-parser");
// Module ejs (pour les views)
const ejs = require("ejs");
// Module moongose
const mongoose = require("mongoose");
// Module method-override (methode)
const methodOverride = require("method-override");
// Module Flash message middleware for Connect.
const flash = require("connect-flash");

// Module auth avec passport
const passport = require("passport");
// Module pour le lien entre moongose et passport pour les auth
const passportLocalMongoose = require("passport-local-mongoose");

// router
const { userRouter } = require("./routers");
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

// PORT
const PORT = process.env.PORT ?? 3000;
//EJS
app.set("view engine", "ejs");
// Public
app.use(express.static("public"));

// Body Parcer
app.use(bodyParser.urlencoded({ extended: false }));

// Module Flash message middleware for Connect.
app.use(flash())
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success")
  next();
})



app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
