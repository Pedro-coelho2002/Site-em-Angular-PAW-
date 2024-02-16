var express = require("express");
var router = express.Router();
var ticketController = require("../controllers/TicketController");

router.post("/add", ticketController.addApiTickets);
router.get("/:userId", ticketController.getTicketsByUser);

module.exports = router;