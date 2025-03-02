const mongoose  = require('mongoose')

const connectionstring =process.env.DBCONNECTIONSTRING

mongoose.connect(connectionstring).then(res=>{
    console.log("MongoDb connection successfully connected");
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
})


