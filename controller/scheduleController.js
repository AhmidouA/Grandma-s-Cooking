const { Schedule } = require("../models");
// la seul qui marche avec require  "chalk": "^4.1.2",
const chalk = require("chalk");

const scheduleController = {
  //module schedule Page
  async schedulePage(req, res) {
    const userId = req.user.id;
    console.log(chalk.blue("{ userId }>>>>>>", userId));

    try {
      const schedule = await Schedule.find({ user: userId });
      console.log(chalk.green("{ schedule }>>>>>>", schedule));
      res.render("schedule", { schedule: schedule });
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le planing n'a as pu etre trouvé`));
      res.render("500");
    }
  },

  //module Add Schedule Page
  AddSchedulePage(req, res) {
    res.render("newSchedule");
  },

  //module Add Schedule form
  async makeSchedule(req, res) {
    const userId = req.user.id;
    console.log(chalk.cyan("{ userId }>>>>>>", userId));
    const receipeName = req.body.receipeName;
    console.log(chalk.blue("{ receipeName }>>>>>>", receipeName));
    const scheduleDate = req.body.scheduleDate;
    console.log(chalk.cyan("{ scheduleDate }>>>>>>", scheduleDate));
    const time = req.body.time;
    console.log(chalk.blue("{ time }>>>>>>", time));

    try {
      const AddSchedule = await Schedule.create({
        receipeName: receipeName,
        scheduleDate: scheduleDate,
        user: userId,
        time: time,
      });
      console.log(chalk.blue("{ AddSchedule }>>>>>>", AddSchedule));

      req.flash("success", "Votre planing à bien été ajouté");
      res.redirect("/dashboard/schedule");
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le planing n'a as pu etre ajouté`));
      res.render("500");
    }
  },

  //module delete schedule
  async deleteSchedule(req, res) {
    const userId = req.user.id;
    console.log(chalk.cyan("{ userId }>>>>>>", userId));

    try {
      const deleteSchedule = await Schedule.deleteOne({ user: userId });
      console.log(chalk.blue("{ deleteSchedule }>>>>>>", deleteSchedule));

      req.flash("success", "Votre planing à bien été supprimé");
      res.redirect("/dashboard/schedule");
    } catch (err) {
      console.error(chalk.bgRedBright(err));
      console.error(chalk.bgRedBright(`le planing n'a as pu etre supprimé`));
      res.render("500");
    }
  },
};

module.exports = scheduleController;
