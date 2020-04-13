var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')
let mongo = require('../controllers/dbconn')


let BlogApp = mongoose.model("blogapp");

/* GET home page. */

// BlogApp.create({ title :"EAT SOMETHING",
// image :"https://images.pexels.com/photos/3754296/pexels-photo-3754296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//  body :"Eating is a good habit",
// date :"1992-12-05"},(err,docs)=>{
//   if(!err){
//     console.log("USC");
//   }
//   else{
//     console.log("fail")
//   }
// });


router.get('/blogs', function(req, res, next) {
  BlogApp.find({},(err,docs)=>{
    if(!err){
      console.log(docs)
      res.render('index', {blogs : docs});
    }
    else{
      res.json("there is a error in GET /blogs");
    }
  })
  
});

router.get('/blogs/new',(req,res,next)=>{
  res.render("newform")
})

router.post('/blogs',(req,res,next)=>{
  let t = {
    title : req.body.title,
    body : req.body.body,
    image : req.body.image,
    
  }
  BlogApp.create(t,(err,result)=>{
    if(!err){
      res.redirect('/blogs')
    }
    else{
      res.json("there is a error in POST /BLOG")
    }
  })
})

router.get('/blogs/:id/edit',(req,res,next)=>{
  console.log(req.params.id)
  BlogApp.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.render('edirform',{ data : doc })
    }
    else{
      res.json("error in the edit route")
    }
  })   
  // res.send("hellp")
})

router.get('/blogs/:id',(req,res,next)=>{
  BlogApp.findById(req.params.id,(err,result)=>{
    if(!err){
      res.render("blogDetails",{
        blog:result
      })
    }
    else{
      res.json("error in showing the findbyid results")
    }
  })
})

router.put('/blogs/:id',(req,res,next)=>{
  let t ={
    title: req.body.title ,
    image: req.body.image,
    body : req.body.body
  }
  BlogApp.findByIdAndUpdate(req.params.id,t,(err, upadte)=>{
    if(!err){
      res.redirect('/blogs');
    }
    else{
      res.json("error in put")
    }
  })
})

router.delete('/blogs/:id',(req,res,next)=>{
     BlogApp.findByIdAndDelete(req.params.id,(err,docs)=>{
       if(!err){
         res.redirect('/blogs')
       }
       else{
         res.json("ERROR IN REMOVING THE DOC")
       }
     })
})

module.exports = router;
