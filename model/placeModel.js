const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeName:{
        type:String,
        required: true
    },
    locationUrl:{
        type:String,
        required: true,
        unique:true
    },
    description:{
        type:String,
        required: true
    },
    placeImg:{
        type:String,
        required: true
    },
})

const places = mongoose.model("places",placeSchema)
module.exports = places