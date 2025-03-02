const hotels = require('../model/HotelModel')

exports.addHotelController=async(req,res)=>{
    console.log("inside addHotelController");
    const{hotelName,description,wifi,locationUrl,rate}=req.body 
    const hotelImg = req.file ? req.file.filename : null; 
    console.log(hotelName,description,wifi,locationUrl,hotelImg);

   try{
    const existinhHotel = await hotels.findOne({locationUrl})
    if(existinhHotel){
        console.log("already exist");
        res.status(401).json("already exist")
        
    }else{
        const newHotel= new hotels({hotelName,description,wifi,locationUrl,hotelImg,rate})
        await newHotel.save()
        res.status(200).json("Added successfully")
        
    }
   }catch(e){
    console.log(e);
    res.status(401).json(e)
    
   }
    
    
}

exports.removeHotelController=async(req,res)=>{
    console.log("inside removePlaceController");
    const {id}=req.params
    try{
        const deletehotel = await hotels.findByIdAndDelete(id)
        res.status(200).json(deletehotel)
    }catch(e){
        console.log(e);
        
    }
    
}

// show hotels
exports.getHotelController=async(req,res)=>{
    console.log("inside getHotelController");
    try{
        const getHotel = await hotels.find()
    res.status(200).json(getHotel)
    }catch(e){
        console.log(e);
        res.status(401).json(e)
        
    }
    
}

// edit hotel
exports.editHotelController = async (req, res) => {
    console.log("Inside editHotelController");
    const { id } = req.params;
    const { hotelName, description, wifi, locationUrl, rate, hotelImg } = req.body;

    // Use uploaded image if available, otherwise keep the existing one
    const reUploadImg = req.file ? req.file.filename : hotelImg;

    try {
        const updateHotel = await hotels.findByIdAndUpdate(
            id,  // Pass ID directly
            { hotelName, description, wifi, locationUrl, rate, hotelImg: reUploadImg },
            { new: true }  // Return the updated document
        );

        if (!updateHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json(updateHotel);
    } catch (error) {
        console.error("Error updating hotel:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
