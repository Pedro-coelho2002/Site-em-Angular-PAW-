var mongoose = require("mongoose");
var Event = require("../models/Event");

var statisticsController = {};

statisticsController.list = function (req, res) {
  Event.find({}).exec((err, events) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(events);
      res.render("../views/statistics/statisticsView", { events: events });
    }
  });
};

statisticsController.event = function (req, res) {
  Event.findOne({ _id: req.params.id }).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/statistics/statisticsViewEvent", { event: event });
    }
  });
};

module.exports = statisticsController;
