const express = require('express')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const eventController = require('../controllers/eventController')
const eventRouter = express.Router()

eventRouter.post("/add-event",multerMiddleware.single("image"),eventController.addEventController)
eventRouter.get("/events",eventController.getEventController)
// details of event
eventRouter.get("/events/:id/detail-events",eventController.getDetailEventController)
eventRouter.post("/:id/add-booking",jwtMiddleware,eventController.bookEventController)
// show bookings to user
eventRouter.get("/user-booking",jwtMiddleware,eventController.bookingUserHistoryController)
// show all bookings in admin page
eventRouter.get("/all-booking",eventController.bookingHistoryController)

module.exports = eventRouter