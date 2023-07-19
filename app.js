const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

var handlebarsExpress = require("express-handlebars").create({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {
    times: function (n, block) {
      var accum = "";
      for (var i = 1; i <= n; ++i) accum += block.fn(i);
      return accum;
    },
    math: function (lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);

      return {
        "+": lvalue + rvalue,
      }[operator];
    },
  },
});

app.use(bodyParser.json());

app.use(express.static("public"));

app.engine("hbs", handlebarsExpress.engine);

app.set("view engine", "hbs");

app.use("/", require("./routes/index"));

app.use("/questions", require("./routes/question"));

app.use("*", require("./routes/error"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.on("SIGINT", function () {
  process.exit();
});
