const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogApp',{useNewUrlParser:true, useUnifiedTopology:true },(err,docs)=>{
    if(!err){
        console.log("SUCCESS IN CONNECTING TO DB");
        
    }
    else{
        console.log("ERROR IN CONNECTING TO DB");
        
    }
})

let BlogAppSchema = new mongoose.Schema({
    title  : {
        type : String,
        // require: "REQ."
    },
    image : {
        type : String,
        // require : "REQ."
    },

    body : {
        type : String,
   
      
        // require
    },
    date : {
        type: Date,
        default: Date.now
    } 
});


mongoose.model('blogapp',BlogAppSchema);



