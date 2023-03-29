const { schedule } = require('../models')
// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");


const scheduleController = {
    //module schedule Page
    schedulePage (req, res) {
        res.render('schedule')
    }
}

module.exports = scheduleController