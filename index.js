const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
require("dotenv").config();
const PORT = process.env.PORT ?? 3000;

mongoose.connect(process.env.MGDBURL)


//EJS
app.set("view engine", "ejs")
// Public
app.use(express.static("public"))

// Body Parcer
app.use(bodyParser.urlencoded({extended: false}))

// Models
const User = require('./models/user')

app.get('/', (req,res) => {
    res.render("index")

});


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})