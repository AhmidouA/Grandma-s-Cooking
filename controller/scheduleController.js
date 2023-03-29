const { Schedule } = require('../models')
// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");


const scheduleController = {
    //module schedule Page
    async schedulePage (req, res) {
        const userId = req.user.id
        console.log(chalk.blue("{ userId }>>>>>>", userId));
        
        try {
            const schedule = await Schedule.find({user: userId})
            console.log(chalk.green("{ schedule }>>>>>>", schedule));
            res.render('schedule', {schedule: schedule})
        } catch (err) {
            console.error(chalk.bgRedBright(err));
            console.error(chalk.bgRedBright(`le planing n'a as pu etre trouvé`));
        }
        
    }
}

module.exports = scheduleController