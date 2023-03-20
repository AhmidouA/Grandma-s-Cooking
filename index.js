const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");



require("dotenv").config();
const PORT = process.env.PORT ?? 3000;

//EJS
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get('/', (req,res) => {
    res.render("index")

});


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})