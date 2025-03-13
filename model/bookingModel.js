const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ticketCount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status:{
    type:String,
    required:true,
    default:'pending'
},
});
const bookings = mongoose.model("bookings", bookingSchema);
module.exports = bookings;
