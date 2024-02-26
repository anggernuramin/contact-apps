const chalk = require("chalk");
const alertSucces = (message) => {
  return console.log(chalk.bold.blue.inverse(message));
};
const alertWarning = (message) => {
  console.log(chalk.yellow.inverse(message));
};
const alertError = (message) => {
  console.log(chalk.red.inverse(message));
};
module.exports = { alertSucces, alertError, alertWarning };
