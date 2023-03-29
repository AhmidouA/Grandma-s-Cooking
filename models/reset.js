const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const resetSchema = new mongoose.Schema({
  username: String,
  resetPasswordToken: String,
  resetPasswordExpires: Number,
});

// rajouter des info pour save un password haché et un salt automatiquement
resetSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Reset", resetSchema);
