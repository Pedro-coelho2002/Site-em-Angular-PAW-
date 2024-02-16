var Ticket = require("../models/Ticket");
var User = require("../models/User");
var Event = require("../models/Event");
var Local = require("../models/Local");

var TicketController = {};

TicketController.list = function (req, res) {
  Ticket.find({}).exec((err, tickets) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(tickets);
      res.render("../views/ticket/view", { tickets: tickets });
    }
  });
};

TicketController.show = function (req, res) {
  Ticket.findOne({ _id: req.params.id }).exec(function (err, ticket) {
    if (err) {
      console.log("Error:", err);
    } else {
      Event.findOne({ _id: ticket.event_id }).exec(function (err, event) {
        if (err) {
          console.log(err);
        } else {
          Local.findOne({ _id: event.local_id }).exec(function (err, local) {
            if (err) {
              console.log(err);
            } else {
              res.render("../views/ticket/view", {
                ticket: ticket,
                event: event,
                local: local,
              });
            }
          });
        }
      });
    }
  });
};

TicketController.create = function (req, res) {
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

TicketController.save = function (req, res) {
  if (typeof req.body.countInfantil === "undefined") {
    req.body.countInfantil = 0;
  }
  if (typeof req.body.countJuvenil === "undefined") {
    req.body.countJuvenil = 0;
  }
  if (typeof req.body.countAdulto === "undefined") {
    req.body.countAdulto = 0;
  }
  if (typeof req.body.countSenior === "undefined") {
    req.body.countSenior = 0;
  }

  Event.findByIdAndUpdate(
    req.params.id,
    {
      $inc: {
        countInfantil: req.body.countInfantil,
        countJuvenil: req.body.countJuvenil,
        countAdulto: req.body.countAdulto,
        countSenior: req.body.countSenior,
      },
    },
    { new: true },
    function (err, event) {
      if (err) {
        console.log(err);
      } else {
        const newTicket = {
          user_id: req.body.user_id,
          local_id: event.local_id,
          event_id: event._id,
          nifNumber: req.body.nif,
          countInfantil: req.body.countInfantil,
          countJuvenil: req.body.countJuvenil,
          countAdulto: req.body.countAdulto,
          countSenior: req.body.countSenior,
          totalPrice: req.body.totalPrice,
          image: event.image,
        };

        //NOVO
        if (req.body.nif) {
          User.findOne({ nif: req.body.nif }, function (err, user) {
            if (err) {
              console.log("Error: ", err);
            } else if (user) {
              //NOVO
              var promo = 1;
              console.log("promo: " + Number(req.body.discountValue));
              switch (Number(req.body.discountValue)) {
                case 100:
                  promo = 0.6;
                  break;
                case 60:
                  promo = 0.75;
                  break;
                case 30:
                  promo = 0.9;
                  break;
                default:
                  promo = 1;
                  break;
              }

              User.updateOne(
                { _id: user._id },
                {
                  $inc: {
                    points:
                      Math.round(req.body.totalPrice * promo) -
                      Number(req.body.discountValue),
                  },
                },
                function (err) {
                  if (err) {
                    console.log("Error: ", err);
                  } else {
                    console.log("Successfully updated user points.");
                  }
                }
              );
            } else {
              // Nenhum User encontrado com o NIF, criar um novo User
              var newUser = new User({
                name: "",
                address: "",
                contact: "",
                email: "",
                cargo: "CLIENT",
                nif: req.body.nif,
                points: Math.round(req.body.totalPrice),
              });
              newUser.save(function (err) {
                if (err) {
                  console.log("Error: ", err);
                } else {
                  console.log("Successfully created a new user.");
                }
              });
            }
          });
        }
        var ticket = new Ticket(newTicket);
        ticket.save(function (err) {
          if (err) {
            console.log(err);
            res.render("../views/event/buyTicket");
          } else {
            console.log("Successfully created a Ticket.");
            res.redirect("/tickets/show/" + ticket._id);
          }
        });
      }
    }
  );
};

TicketController.edit = function (req, res) {
  Ticket.findOne({ _id: req.params.id }).exec(function (err, ticket) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/ticket/edit", { ticket: ticket });
    }
  });
};

TicketController.update = function (req, res) {
  Ticket.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        //Ticket structure
      },
    },
    { new: true },
    function (err, Ticket) {
      if (err) {
        console.log(err);
        res.render("../views/ticket/edit", { ticket: req.body });
      }
      res.redirect("/tickets/show/" + ticket._id);
    }
  );
};

TicketController.delete = function (req, res) {
  Ticket.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Ticket deleted");
      res.redirect("/tickets");
    }
  });
};

TicketController.buyTicket = function (req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      $inc: {
        countInfantil: req.body.countInfantil,
        countJuvenil: req.body.countJuvenil,
        countAdulto: req.body.countAdulto,
        countSenior: req.body.countSenior,
      },
    },
    { new: true },
    Ticket.find({ _id: req.params.id }).exec((err, ticket) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(ticket);
        res.redirect("/ticket/show/" + ticket._id);
      }
    })
  );
};

//********* API *********

async function createTicket(tickets, eventName) {
  var newTicket = new Ticket({
    user_id: null,
    local_id: null,
    event_id: null,
    nifNumber: 0,
    countInfantil: 0,
    countJuvenil: 0,
    countAdulto: 0,
    countSenior: 0,
    totalPrice: 0,
    image: "eventoSemImagem.png",
  });

  console.log("************NEW TICKET***************");

  try {
    const event = await Event.findOne({ name: eventName }).exec();
    if (event) {
      newTicket.event_id = event._id;
      newTicket.local_id = event.local_id;
    }
  } catch (err) {
    console.log(err);
  }

  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].eventName === eventName) {
      newTicket.user_id =  tickets[i].userId;
      newTicket.nifNumber = tickets[i].userNIF;
      console.log("*NIF: ", newTicket.nif);

      newTicket.totalPrice += tickets[i].price * tickets[i].quantity;

      switch (tickets[i].ticketType) {
        case "Infantil":
          newTicket.countInfantil = tickets[i].quantity;
          break;
        case "Juvenil":
          newTicket.countJuvenil = tickets[i].quantity;
          break;
        case "Adulto":
          newTicket.countAdulto = tickets[i].quantity;
          break;
        case "Sénior":
          newTicket.countSenior = tickets[i].quantity;
          break;
      }
    }
  }

  console.log("TICKET: ", newTicket);

  newTicket.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created a Ticket.");

      User.findOne({ nif: newTicket.nif }, function (err, user) {
        if (err) {
          console.log("Error: ", err);
        } else if (user) {

          switch(tickets[0].promo){
            case 0.9:
              user.points -= 30;
              break;
              case 0.75:
              user.points -= 60;
              break;
              case 0.6:
              user.points -= 100;
              break;
          }
          user.points += Math.round(newTicket.totalPrice);

          user.save(function(err){
            if(err){
              console.log(err);
            }else{
              console.log("User points updated (+ ", Math.round(newTicket.totalPrice), ").");
            }
          });
          
        } else {
          console.log("User not found.");
        }
      });
    }
  });
}

TicketController.addApiTickets = function (req, res) {
  var apiTickets = req.body;
  var eventNames = [];

  //eliminar eventName duplicados para separar tickets
  for (var i = 0; i < apiTickets.length; i++) {
    if (!eventNames.includes(apiTickets[i].eventName)) {
      eventNames.push(apiTickets[i].eventName);
    }
  }

  for (var i = 0; i < eventNames.length; i++) {
    createTicket(apiTickets, eventNames[i]);
  }

  res.json(apiTickets);
};

TicketController.getTicketsByUser = function (req, res) {
  const user_id = req.params.userId;
    Ticket.find({ user_id: user_id }, function (err, tickets) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao obter tickets", error: err.message });
      }
      res.json(tickets);
    });
}

module.exports = TicketController;
