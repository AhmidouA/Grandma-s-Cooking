// module moongose
const mongoose = require("mongoose");

// Module auth avec passport
const passport = require("passport");
// Module pour le lien entre moongose et passport pour les auth
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// rajouter des info pour save un password haché et un salt automatiquement
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
