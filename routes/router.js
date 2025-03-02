const  express = require('express')
const userController = require('../controllers/userController')
const placeController = require('../controllers/placeController')
const favController = require('../controllers/favouriteController')
const multerMiddleware = require('../middleware/multerMiddleware')
const jwtMiddleware = require('../middleware/jwtMiddleware')


const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

//getallUsers
router.get('/users',userController.getAllusersController)

// delete user 
router.delete('/:id/remove',userController.deleteUserController)

// add place by admin
router.post('/places',multerMiddleware.single("placeImg"),placeController.addPlaceController)
// delete place by admin
router.delete('/:id/removePlace',placeController.deletePlaceController)
// get place  
router.get('/get-places',placeController.getHomePlaceController)
//get place details for user
router.get('/get-places/:id',placeController.getDetailPlaceController)
//edit place details by admin
router.put('/:id/edit-places',multerMiddleware.single("placeImg"),placeController.editPlaceController)
// add to favourites user
router.post('/add-fav',jwtMiddleware,multerMiddleware.single("placeImg"),favController.addToFavController)

// view favourites user
router.get('/get-fav',jwtMiddleware,favController.getUserFavController)

// delete from favourites from user
router.delete('/:id/remove-fav',favController.removeFavController)
// get place  cont for dashboard
router.get('/dash-places',placeController.getPlaceCountController)


module.exports = router