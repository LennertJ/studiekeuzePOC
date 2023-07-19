const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());

const indexController = require("./../controllers/indexController");

router.get(
  "/",
  function (req, res, next) {
    let test = req.cookies;
    res.render("index", {
      yeetus: test.points,
    });
  },
  indexController.index
);

module.exports = router;
