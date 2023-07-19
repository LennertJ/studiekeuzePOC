const func = require("./../scripts/script");
var json = func.getJson();

module.exports.index = function (req, res) {
  res.render("questions", {
    post: json,
  });
};

module.exports.answer = function (req, res) {
  res.render("answer");
};
