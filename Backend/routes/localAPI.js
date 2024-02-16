var express = require("express");
var router = express.Router();
var localController = require("../controllers/LocalController");

// Obter todos os locais
router.get("/", localController.getAllLocals);

// Obter um local através do ID
router.get("/:localId", localController.getOneLocal);

// Obter a imagem de um evento pelo ID
router.get("/image/:localId", localController.getImageLocal);

// Obtem o local de acordo com o ID
router.param("localId", localController.getByIdLocal);

module.exports = router;
