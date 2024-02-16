const express = require("express");
const router = express.Router();
const eventController = require("../controllers/LocalEventsAPI");

// Rota para obter todos os eventos de um local específico
router.get("/:localId", eventController.getEventsByLocal);

module.exports = router;
