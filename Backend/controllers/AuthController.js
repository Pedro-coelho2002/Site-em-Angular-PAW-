const Cliente = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../jwt_secret/config");

var authController = {};

authController.login = function (req, res) {
  Cliente.findOne({ email: req.body.email }, function (err, Cliente) {
    if (err) return res.status(500).send("Error on the server.");
    if (!Cliente) return res.status(404).send("No Cliente found.");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      Cliente.password
    );

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if Cliente is found and password is valid
    // create a token
    var token = jwt.sign({ id: Cliente._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token, cargo: Cliente.cargo, id:Cliente._id});
  });
};

authController.register = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Cliente.create(
    {
      name: req.body.name,
      address: req.body.address,
      password: hashedPassword,
      contact: req.body.contact,
      email: req.body.email,
      cargo: "CLIENT",
      nif: req.body.nif,
      points: 0,
    },
    function (err, user) {
      if (err) return res.status(500).json(err);

      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token, cargo: Cliente.cargo });
    }
  );
};

authController.verifyToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

authController.verifyTokenAdmin = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err || decoded.role !== "ADMIN") {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate token or not Admin",
      });
    }
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

authController.getOneUser = function (req, res) {
  res.json(req.user);
};

authController.getByIdUser = function (req, res, next, id) {
  Cliente.findOne({ _id: id }, function (err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};
module.exports = authController;
