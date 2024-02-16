var express = require("express");
var router = express.Router();
var ticket = require("../controllers/TicketController.js");

// Get all tickets
router.get("/", function (req, res) {
  ticket.list(req, res);
});

// Get single ticket by id
router.get("/show/:id", function (req, res) {
  ticket.show(req, res);
});

// Create event
router.get("/create", function (req, res) {
  ticket.create(req, res);
});

// Save ticket
router.post("/save/:id", function (req, res) {
  ticket.save(req, res);
});

// Edit ticket
router.get("/edit/:id", function (req, res) {
  ticket.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  ticket.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  ticket.delete(req, res);
});

// Create ticket
router.get("/buy", function (req, res, next) {
  ticket.create(req, res);
});

module.exports = router;
