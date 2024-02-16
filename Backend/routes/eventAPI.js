var express = require("express");
var router = express.Router();
var eventController = require("../controllers/EventController");

// Obter todos os eventos
router.get("/", eventController.getAllEvents);

// Obter um evento através do ID
router.get("/:eventId", eventController.getOneEvent);

// Obter a imagem de um evento pelo ID
router.get("/image/:eventId", eventController.getImageEvent);

// Atualizar o contador de bilhetes vendidos de um evento através do ID
router.put(
  "/updateEventTicketCount/:eventId",
  eventController.updateEventTicketCount
);

// Obtem o evento de acordo com o ID
router.param("eventId", eventController.getByIdEvent);

module.exports = router;
