const places = require("../model/placeModel");

exports.addPlaceController = async (req, res) => {
  console.log("Inside addPlaceController");

  // Get form data
  const { placeName, description, locationUrl } = req.body;
  const placeImg = req.file ? req.file.filename : null; // Retrieve image from req.file

  console.log(placeName, placeImg, description, locationUrl);

  try {
    if (!placeName || !description || !locationUrl || !placeImg) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingPlace = await places.findOne({ locationUrl });
    if (existingPlace) {
      return res.status(409).json({ error: "Place already exists" });
    }

    const newPlace = new places({ placeName, placeImg, description, locationUrl });
    await newPlace.save();

    res.status(201).json({ message: "Place added successfully!", place: newPlace });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get Home place
exports.getHomePlaceController=async(req,res)=>{
  const searchKey = req.query.search
  console.log(searchKey);
  const query={
    placeName:{
      $regex:searchKey,$options:'i'
    }
  }
  
  try{
    const allPlace = await places.find(query)
    res.status(200).json(allPlace)
  }catch(e){
    console.log(e);
    res.status(401).json(e)
    
  }
}
//get place Detail
exports.getDetailPlaceController=async(req,res)=>{
  const{id}=req.params
  try{
    const place = await places.findById(id)
    res.status(200).json(place)
  }catch(e){
    console.log(e);
    
  }
}

// delete place by admin
exports.deletePlaceController=async(req,res)=>{
  const{id}=req.params
  console.log("inside deletePlaceController" );
  try{
    const deletePlace = await places.findOneAndDelete({_id:id})
    res.status(200).json(deletePlace)
  }catch(e){
    console.log(e);
    res.status(401).json(e)
    
  }
  
}

exports.editPlaceController = async (req, res) => {
  console.log("inside editPlaceController");
  const { id } = req.params;
  const { placeName, locationUrl, placeImg, description } = req.body;
  const reUploadImg = req.file ? req.file.filename : placeImg;

  try {
    const updatePlace = await  places.findByIdAndUpdate(
      { _id: id },
      { placeName, locationUrl, placeImg: reUploadImg, description },
      { new: true }
    );
    res.status(200).json(updatePlace);
    console.log(updatePlace);
  } catch (e) {
    console.log(e);
    res.status(401).json(e);
  }
};



//get place count for dashboard
exports.getPlaceCountController=async(req,res)=>{ 
  try{
    const allPlace = await places.find()
    res.status(200).json(allPlace)
  }catch(e){
    console.log(e);
    res.status(401).json(e)
    
  }
}

