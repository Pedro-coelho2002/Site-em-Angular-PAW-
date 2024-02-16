var mongoose = require("mongoose");
var User = require("../models/User");
var Ticket = require("../models/Ticket");

var userController = {};

userController.list = function (req, res) {
  User.find({ cargo: { $in: ["EMPLOYEE", "ADMIN"] } }).exec((err, users) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(users);
      res.render("../views/user/users", { users: users });
    }
  });
};


userController.show = function (req, res) {
  User.findOne({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("user/view", { user: user });
    }
  });
};

userController.create = function (req, res) {
  res.render("../views/user/create");
};

userController.save = function (req, res) {
  var user = new User({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
    cargo: req.body.cargo,
    nif: req.body.nif,
    points: 0,
  });

  user.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/users/create");
    } else {
      console.log("Successfully created an User.");
      res.redirect("/user/show/" + user._id);
    }
  });
};

userController.edit = function (req, res) {
  User.findOne({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/user/edit", { user: user });
    }
  });
};

userController.update = function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        cargo: req.body.cargo,
      },
    },
    { new: true },
    function (err, user) {
      if (err) {
        console.log(err);
        res.render("../views/user/edit", { user: req.body });
      }
      res.redirect("/user/show/" + user._id);
    }
  );
};

userController.delete = function (req, res) {
  Ticket.findOne({ user: req.params.id }, function (err, ticket) {
    if (err) {
      console.log(err);
    } else if (ticket) {
      res.send(
        '<script>alert("Não pode ser eliminado pois este já vendeu bilhetes"); window.location="/user";</script>'
      );
    } else {
      User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
          console.log(err);
        } else if (user.cargo === "ADMIN") {
          User.countDocuments({ cargo: "ADMIN" }, function (err, count) {
            if (err) {
              console.log(err);
            } else if (count === 1) {
              res.send(
                '<script>alert("O funcionário com cargo ADMIN não pode ser eliminado pois é o único."); window.location="/User";</script>'
              );
            } else {
              User.remove({ _id: req.params.id }, function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("User deleted");
                  res.redirect("/user");
                }
              });
            }
          });
        } else {
          User.remove({ _id: req.params.id }, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("User deleted");
              res.redirect("/user");
            }
          });
        }
      });
    }
  });
};

module.exports = userController;
