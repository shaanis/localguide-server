const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    placeImg:{
        type:String,
        required:true
    },
    placeName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    locationUrl:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    }
})
// Ensure a user cannot save the same locationUrl multiple times
favouriteSchema.index({ userId: 1, locationUrl: 1 }, { unique: true });

const favourites = mongoose.model("favourites",favouriteSchema)
module.exports = favourites