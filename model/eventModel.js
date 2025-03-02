const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    availableTickets:{
        type:Number,
        required:true
    },
    ticketPrice:{
        type:Number,
        required:true
    },
})
const events = mongoose.model("events",eventSchema)
module.exports = events