const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwtmiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token != ''){
       try{
        const jwtResponse = jwt.verify(token,process.env.JWTPassword)
       console.log(jwtResponse);
       req.userId = jwtResponse.userId
       console.log(req.userId);
       

       }catch(err){
        res.status(401).json("Authorisation failed ... please login")
        console.log(err);
        
       }
       
    }else{
        res.status(404).json("Authorisation Failed . Tocken is missing..!!!")
    }
    
    next()
    
}

module.exports = jwtMiddleware