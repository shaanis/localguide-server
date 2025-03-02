const favourites = require("../model/favouriteModel");

exports.addToFavController = async (req, res) => {
    console.log("Inside favouriteController");

    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    console.log("User ID:", userId);

    const { placeName, description, locationUrl } = req.body;
    console.log(req.body);

    if (!req.file) {
        return res.status(400).json({ message: "Place image is required" });
    }

    const placeImg = req.file.filename;
    console.log(placeName, description, locationUrl, placeImg);

    try {
        // Check if the same user already added this locationUrl
        const existingEntry = await favourites.findOne({ userId, locationUrl });

        if (existingEntry) {
            console.log("User already added this place");
            return res.status(400).json({ message: "You have already added this place" });
        }

        // If all checks pass, save the new favourite
        const newFav = new favourites({
            placeName,
            description,
            locationUrl,
            placeImg,
            userId  
        });

        await newFav.save();
        return res.status(201).json(newFav); // Return response to prevent multiple responses

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// fetch userwise favourite list
exports.getUserFavController = async(req,res)=>{
    console.log("inside getUserFavController");
    const userId = req.userId
    try{
        const userFav = await favourites.find({userId})
        res.status(200).json(userFav)
    }catch(e){
        console.log(e);
        res.status(401).json(e)
    }
    
}

// delete from fav
exports.removeFavController=async(req,res)=>{
    console.log("inside removeFavController");
    const{id}=req.params
   try{
    const removeFav = await favourites.findByIdAndDelete({_id:id})
    res.status(200).json(removeFav)
   }catch(e){
    console.log(e);
    res.status(401).json(e)
    
   }

    
}
