const events = require('../model/eventModel')
const bookings = require('../model/bookingModel');
const users = require('../model/userModel')


// add events by admin
exports.addEventController=async(req,res)=>{
    console.log("inside addEventController");
    const{eventName,description,location,time,availableTickets,ticketPrice,date}=req.body 
    const image = req.file ? req.file.filename : null; 
   try{
    const newEvent = new events({
        eventName,description,location,time,availableTickets,image,ticketPrice,date
    })
    await newEvent.save()
    res.status(200).json(newEvent)
   }catch(e){
    console.log(e);
    res.status(401).json(e)
    
   }
    
}

exports.getEventController=async(req,res)=>{
    console.log("inside getEventController");
    try{
        const showEvent = await events.find()
        res.status(200).json(showEvent)
    }catch(e){
        res.status(401).json(e)
    }
    
}
// /delete event
exports.delteEventController=async(req,res)=>{
    console.log("inside delteEventController");
    const{id}=req.params
    try{
      const deleteEvent = await events.findByIdAndDelete({_id:id})
      res.status(200).json(deleteEvent)
    }catch(e){
        res.status(401).json(e)
    }
}
// detail events
exports.getDetailEventController=async(req,res)=>{
    console.log("inside getDetailEventController");
    const{id}=req.params
    try{
        const showEvent = await events.findById({_id:id})
        res.status(200).json(showEvent)
    }catch(e){
        res.status(401).json(e)
    }
    
}
// booking events
exports.bookEventController = async (req, res) => {
    console.log("inside bookEventController");
    const { id } = req.params; 
    const userId = req.userId; 

    try {
        const { ticketCount } = req.body;

        // Find the event
        const event = await events.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if enough tickets are available
        if (event.availableTickets < ticketCount) {
            return res.status(400).json({ message: "Not enough tickets available" });
        }
        const totalprice = ticketCount*event.ticketPrice
        // console.log(totalprice);
        
        // Create booking record
        const booking = new bookings({
            eventName: event.eventName,
            eventId: event._id,
            time:event.time,
            date:event.date,
            userId,
            ticketCount,
            image:event.image,
            totalPrice:totalprice,
            status:event.status
        });
        await booking.save();

        // Decrement available ticket count
        event.availableTickets -= ticketCount;
        await event.save();

        res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// booking history
exports.bookingHistoryController = async (req, res) => {
    console.log("inside bookingHistoryController");
    const searchKey = req.query.search
  console.log(searchKey);
  const query={
   eventName:{
      $regex:searchKey,$options:'i'
    }
  }
    try {
        // Ensure "user" is the correct reference field in your schema
        const bookingsHistory = await bookings.find(query).populate("userId", "username email");

        res.status(200).json(bookingsHistory);
    } catch (e) {
        console.error("Error fetching booking history:", e);
        res.status(500).json({ error: "Failed to fetch booking history" });
    }
};

// booking history of users
exports.bookingUserHistoryController=async(req,res)=>{
    console.log("inside bookingHistoryController");
    const userId = req.userId
    try{
     const bookingsHistory = await bookings.find({userId})
     res.status(200).json(bookingsHistory)
    }catch(e){
        res.status(401).json(e)
    }
    
}

exports.updateAllBookingsStatusController = async (req, res) => {
    console.log("inside updateAllBookingsStatusController");
    const {id}=req.params
    const { status } = req.query;
    try {
        const result = await bookings.findByIdAndUpdate({_id:id},{status},{new:true})

        res.status(200).json( result);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
};

exports.getAllPendingEventsController=async(req,res)=>{
    console.log("inside getAllPendingEventsController");
    try{
        const pendingEvents = await bookings.find({status:"pending"})
        res.status(200).json(pendingEvents)
    }catch(e){
        res.status(401).json(e)
    }
    
}


