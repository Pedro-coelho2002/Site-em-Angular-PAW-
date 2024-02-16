var mongoose = require("mongoose");
var Local = require("../models/Local");
var Event = require("../models/Event");
var path = require("path");
var fs = require("fs");

var LocalController = {};

LocalController.list = function (req, res) {
  Local.find({}).exec((err, locals) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(locals);
      res.render("../views/local/locals", { locals: locals });
    }
  });
};

LocalController.show = function (req, res) {
  Local.findOne({ _id: req.params.id }).exec(function (err, local) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/local/view", { local: local });
    }
  });
};

LocalController.create = function (req, res) {
  res.render("../views/local/create");
};

LocalController.save = async function (req, res) {
  // #################### ADICIONADO ####################
  const lat = req.body.lat;
  const lon = req.body.lon;

  const url = `https://api.geoapify.com/v2/place-details?lat=${lat}&lon=${lon}&apiKey=06bdcae9cfbb4e0fae58f0da11c5df7e`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    var newLocal;
    if (!req.file) {
      newLocal = {
        name: data.features[0].properties.name,
        lat: req.body.lat,
        lon: req.body.lon,
        street: data.features[0].properties.street,
        county: data.features[0].properties.city,
        postcode: data.features[0].properties.postcode,
        image: "eventoSemImagem.png",
      };
    } else {
      newLocal = {
        name: data.features[0].properties.name,
        lat: req.body.lat,
        lon: req.body.lon,
        street: data.features[0].properties.street,
        county: data.features[0].properties.city,
        postcode: data.features[0].properties.postcode,
        image: req.file.filename,
      };
    }
    var local = new Local(newLocal);

    await local.save();
    console.log("Successfully created a Local.");
    res.redirect("/locals/show/" + local._id);
  } catch (err) {
    console.log(err);
    res.render("../views/local/create");
  }
};

LocalController.edit = function (req, res) {
  Local.findOne({ _id: req.params.id }).exec(function (err, local) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/local/edit", { local: local });
    }
  });
};

LocalController.update = function (req, res) {
  if (!req.file) {
    Local.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          street: req.body.street,
          county: req.body.county,
          postcode: req.body.postcode,
        },
      },
      { new: true },
      function (err, local) {
        if (err) {
          console.log(err);
          res.render("../views/local/edit", { local: req.body });
        }
        res.redirect("/locals");
      }
    );
  } else {
    Local.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          street: req.body.street,
          county: req.body.county,
          postcode: req.body.postcode,
          image: req.file.filename,
        },
      },
      { new: true },
      function (err, local) {
        if (err) {
          console.log(err);
          res.render("../views/local/edit", { local: req.body });
        }
        res.redirect("/locals");
      }
    );
  }
};

LocalController.delete = function (req, res) {
  Event.findOne({ local_id: req.params.id }, function (err, event) {
    if (err) {
      console.log(err);
    } else if (event) {
      res.send(
        '<script>alert("Não pode ser eliminado pois tem eventos associados"); window.location="/locals";</script>'
      );
    } else {
      Local.remove({ _id: req.params.id }, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Local deleted");
          res.redirect("/locals");
        }
      });
    }
  });
};

// ### Métodos para a API ###

LocalController.getAllLocals = function (req, res, next) {
  Local.find(function (err, locals) {
    if (err) {
      next(err);
    } else {
      res.json(locals);
    }
  });
};

LocalController.getOneLocal = function (req, res) {
  res.json(req.local);
};

LocalController.getByIdLocal = function (req, res, next, id) {
  Local.findOne({ _id: id }, function (err, local) {
    if (err) {
      next(err);
    } else {
      req.local = local;
      next();
    }
  });
};

LocalController.getImageLocal = function (req, res) {
  const local = req.local;
  const imagePath = path.join(__dirname, "../public/images/" + local.image);
  console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      next(err);
    }
  });
};

module.exports = LocalController;
