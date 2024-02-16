var express = require("express");
var router = express.Router();
var statistics = require("../controllers/StatisticsController.js");

router.get("/", function (req, res) {
  statistics.list(req, res);
});

router.get("/event/:id", function (req, res) {
  statistics.event(req, res);
});

module.exports = router;
