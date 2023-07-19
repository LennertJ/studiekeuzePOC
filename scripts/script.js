const fs = require('fs');

module.exports.getJson = () => {
  return JSON.parse(fs.readFileSync('./questions.json'));
  //return JSON.parse(fs.readFileSync('./config.json'));
};
