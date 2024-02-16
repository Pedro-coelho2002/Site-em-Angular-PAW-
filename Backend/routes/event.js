var express = require("express");
var router = express.Router();
var event = require("../controllers/EventController.js");

// Adicionado para submissão de ficheiros
var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save
// -----------------------------------------------------------------------

// Get all events
router.get("/", function (req, res) {
  event.list(req, res);
});

// Get single event by id
router.get("/show/:id", function (req, res) {
  event.show(req, res);
});

// Create event
router.get("/create", function (req, res) {
  event.create(req, res);
});

// Adicionado ----------------------------------------

// Multer storage option
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //  + "-" + Date.now() + ".pdf"
  },
});

var upload = multer({ storage: storage });

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(upload.single("file")); // upload.single("image")

// --------------------------------------------------

// Save event
router.post("/save", function (req, res) {
  event.save(req, res);
});

// Edit event
router.get("/edit/:id", function (req, res) {
  event.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  event.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  event.delete(req, res);
});

router.get("/buy/:id", function (req, res, next) {
  event.buy(req, res);
});

module.exports = router;
