var mongoose = require("mongoose");
var Event = require("../models/Event");
var User = require("../models/User");
var Local = require("../models/Local");
var path = require("path");
var fs = require("fs");

var eventController = {};

eventController.list = function (req, res) {
  Event.find({}).exec((err, events) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(events);
      res.render("../views/event/events", { events: events });
    }
  });
};

eventController.show = function (req, res) {
  Event.findOne({ _id: req.params.id }).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/event/view", { event: event });
    }
  });
};

eventController.create = function (req, res) {
  Local.find({}).exec((err, locals) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      if (err) {
        console.log("Error:", err);
      } else {
        res.render("../views/event/create", { locals: locals });
      }
    }
  });
};

eventController.save = function (req, res) {
  var newEvent;

  if (!req.file) {
    newEvent = {
      name: req.body.name,
      description: req.body.description,
      local_id: req.body.local_id,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      priceInfantil: req.body.priceInfantil,
      priceJuvenil: req.body.priceJuvenil,
      priceAdulto: req.body.priceAdulto,
      priceSenior: req.body.priceSenior,
      countInfantil: 0,
      countJuvenil: 0,
      countAdulto: 0,
      countSenior: 0,
      maxTickets: req.body.maxTickets,
      image: "eventoSemImagem.png",
    };
  } else {
    newEvent = {
      name: req.body.name,
      description: req.body.description,
      local_id: req.body.local_id,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      priceInfantil: req.body.priceInfantil,
      priceJuvenil: req.body.priceJuvenil,
      priceAdulto: req.body.priceAdulto,
      priceSenior: req.body.priceSenior,
      countInfantil: 0,
      countJuvenil: 0,
      countAdulto: 0,
      countSenior: 0,
      maxTickets: req.body.maxTickets,
      image: req.file.filename,
    };
  }
  var event = new Event(newEvent);
  event.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/event/create");
    } else {
      console.log("Successfully created an event.");
      res.redirect("/events/show/" + event._id);
    }
  });
};

eventController.edit = function (req, res) {
  Local.find({}).exec((err, locals) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      Event.findOne({ _id: req.params.id }).exec(function (err, event) {
        if (err) {
          console.log("Error:", err);
        } else {
          res.render("../views/event/edit", { event: event, locals: locals });
        }
      });
    }
  });
};

eventController.update = function (req, res) {
  if (!req.file) {
    Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          local_id: req.body.local_id,
          startDateTime: req.body.startDateTime,
          endDateTime: req.body.endDateTime,
          priceInfantil: req.body.priceInfantil,
          priceJuvenil: req.body.priceJuvenil,
          priceAdulto: req.body.priceAdulto,
          priceSenior: req.body.priceSenior,
          maxTickets: req.body.maxTickets,
        },
      },
      { new: true },
      function (err, event) {
        if (err) {
          console.log(err);
          res.render("../views/events/edit", { event: req.body });
        }
        res.redirect("/events/show/" + event._id);
      }
    );
  } else {
    Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          local_id: req.body.local_id,
          startDateTime: req.body.startDateTime,
          endDateTime: req.body.endDateTime,
          priceInfantil: req.body.priceInfantil,
          priceJuvenil: req.body.priceJuvenil,
          priceAdulto: req.body.priceAdulto,
          priceSenior: req.body.priceSenior,
          maxTickets: req.body.maxTickets,
          image: req.file.filename,
        },
      },
      { new: true },
      function (err, event) {
        if (err) {
          console.log(err);
          res.render("../views/events/edit", { event: req.body });
        }
        res.redirect("/events/show/" + event._id);
      }
    );
  }
};

eventController.delete = function (req, res) {
  Event.findOne({ _id: req.params.id }).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    } else {
      if (
        event.countInfantil +
          event.countJuvenil +
          event.countAdulto +
          event.countSenior ==
        0
      ) {
        event.remove(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Event deleted");
            res.redirect("/events");
          }
        });
      } else {
        res.send(
          '<script>alert("Evento nao pode ser removido porque contem bilhetes já pagos"); window.location="/events";</script>'
        );
      }
    }
  });
};

eventController.buy = function (req, res) {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      Event.findOne({ _id: req.params.id }).exec((err, event) => {
        if (err) {
          console.log("Error:", err);
        } else {
          res.render("../views/event/buyTicket", {
            event: event,
            users: users,
          });
        }
      });
    }
  });
};

// ### Métodos para a API ###

eventController.getAllEvents = function (req, res, next) {
  Event.find(function (err, events) {
    if (err) {
      next(err);
    } else {
      res.json(events);
    }
  });
};

eventController.getOneEvent = function (req, res) {
  res.json(req.event);
};

eventController.getByIdEvent = function (req, res, next, id) {
  Event.findOne({ _id: id }, function (err, event) {
    if (err) {
      next(err);
    } else {
      req.event = event;
      next();
    }
  });
};

eventController.getImageEvent = function (req, res) {
  const event = req.event;
  const imagePath = path.join(__dirname, "../public/images/" + event.image);
  console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      next(err);
    }
  });
};


eventController.updateEventTicketCount = function (req, res, next) {
  Event.findByIdAndUpdate(req.params.eventId, { $inc: req.body }, (err, updateEvent) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(updateEvent);
    }
  });
};


module.exports = eventController;
