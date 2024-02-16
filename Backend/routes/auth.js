var express = require("express");
var router = express.Router();
var authController = require("../controllers/AuthController");

router.post('/login' ,authController.login );
router.post('/register', authController.register );
router.get('/:userId', authController.getOneUser);

router.param("userId", authController.getByIdUser);

module.exports = router;