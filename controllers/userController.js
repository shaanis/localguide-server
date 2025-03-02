const users = require('../model/userModel')
const jwt = require('jsonwebtoken')
exports.registerController = async(req,res)=>{
    console.log("inside register controller");
    console.log(req.body);
    const {email,password,username}=req.body
    try{
       const existingUser = await users.findOne({email})
       if(existingUser){
         res.status(406).json("Already have an account please login")
       }else{
        const newUser = new users({
            username,email,password
        })
        await newUser.save()
         res.status(200).json(newUser)

       }
    }catch(e){
       return res.status(401).json(e)
    }   
}

// login
exports.loginController = async(req,res)=>{
  console.log("inside loginController");
  const {email,password}= req.body
  console.log(email,password);
  
  try{
    existingUser = await users.findOne({email,password})
    if(existingUser){
      // token generation
      const token = jwt.sign({userId: existingUser._id},process.env.JWTPassword)
      res.status(200).json({
        user:existingUser,token
      })
    }else{
      res.status(401).json('incorrect email or password')
    }
  }catch(e){
    res.status(401).json(e)
  }
  
}
  
// getAllusers
exports.getAllusersController = async(req,res)=>{
  try{
    const allUsers= await users.find()
    res.status(200).json(allUsers)
  }catch(e){
    res.status(401).json(e)
  }
}

//dlete user 
exports.deleteUserController = async(req,res)=>{
 console.log("inside deleteUserController");
 const {id}=req.params
 try{
  const deleteUser = await users.findByIdAndDelete({_id:id})
  res.status(200).json(deleteUser)

 }catch(e){
  res.status(401).json(e)
 }
 
}
