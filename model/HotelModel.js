const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type:String,
        required:true
    },
    hotelImg:{
        type:String,
        required:true
    },
    wifi:{
        type:String,
        required:true
    },
    locationUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    }
})
 const hotels = mongoose.model("hotels",hotelSchema)
 module.exports = hotels