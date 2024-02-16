var express = require("express");
var router = express.Router();
var local = require("../controllers/LocalController.js");
var API_KEY = "06bdcae9cfbb4e0fae58f0da11c5df7e";

// Adicionado para submissão de ficheiros
var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save
// -----------------------------------------------------------------------

// Get all locals
router.get("/", function (req, res) {
  local.list(req, res);
});

// Get single local by id
router.get("/show/:id", function (req, res) {
  local.show(req, res);
});

// Create local
router.get("/create", function (req, res) {
  local.create(req, res);
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

// Save local
router.post("/save", function (req, res) {
  local.save(req, res);
});

// Edit local
router.get("/edit/:id", function (req, res) {
  local.edit(req, res);
});

// Update local
router.post("/update/:id", function (req, res) {
  local.update(req, res);
});

// Delete local
router.post("/delete/:id", function (req, res, next) {
  local.delete(req, res);
});

module.exports = router;
