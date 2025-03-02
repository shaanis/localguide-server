const express = require('express')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const hotelController = require('../controllers/hotelController')

const hotelRouter = new express.Router()



// add hotel
hotelRouter.post('/add-hotel',multerMiddleware.single('hotelImg'),hotelController.addHotelController)
// delete hotel
hotelRouter.delete('/:id/remove-hotel',hotelController.removeHotelController)
// show hotels details
hotelRouter.get('/get-hotel',hotelController.getHotelController)
// edit hotels details
hotelRouter.put('/:id/edit-hotel',multerMiddleware.single("hotelImg"),hotelController.editHotelController)

module.exports = hotelRouter