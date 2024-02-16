const router = require("express").Router();

var indexRouter = require("./index");
var usersRouter = require("./users");
var userRouter = require("./user");
var eventRouter = require("./event");
var localRouter = require("./local");
var ticketRouter = require("./ticket");
var statisticsRouter = require("./statistics");
var eventAPIRouter = require("./eventAPI");
var localAPIRouter = require("./localAPI");
var LocalEventsAPI = require("./localEventsAPI");
var AuthRouter = require("./auth");
var stripeAPI = require("./stripeAPI");
var ticketAPIRouter = require ("./ticketAPI");

router.use("/", indexRouter);
router.use("/user", userRouter);
router.use("/events", eventRouter);
router.use("/users", usersRouter);
router.use("/locals", localRouter);
router.use("/tickets", ticketRouter);
router.use("/statistics", statisticsRouter);
router.use("/api/v1/events", eventAPIRouter);
router.use("/api/v1/events/byLocal", LocalEventsAPI);
router.use("/api/v1/tickets", ticketAPIRouter);
router.use("/api/v1/locals", localAPIRouter);
router.use("/api/v1/auth", AuthRouter);
router.use("/checkout", stripeAPI);

module.exports = router;
