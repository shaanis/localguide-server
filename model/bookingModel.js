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
  totalPrice: {
    type: Number,
    required: true,
  },
});
const bookings = mongoose.model("bookings", bookingSchema);
module.exports = bookings;
