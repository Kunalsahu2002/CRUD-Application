const express = require("express")
const Router = express.Router()
const Club = require('../models/club')


Router.get('/',(err,res)=>{
   res.render('index')
})

// <--INSERT DATA-->
Router.post('/add',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;

   //  console.log(name,email)

   const club = new Club({
      name,
      email
   })
   // club.save(err=>{
   //    if(err){
   //       console.log("err is ")
   //    }else{
   //       res.redirect('/')
   //    }
   // })
   //----------------------------------
   club.save()
   .then(()=>{
      res.redirect('/');
   }).catch((err)=>{
      console.log("err is");
   })
})

//-------------------------------------------------------------------------------------------------------------------


//<--FIND DATA-->
Router.get('/show',(req,res)=>{
   Club.find()
   .then((docs)=>{
      // console.log(docs);
      res.render('show',{
         students: docs
      })
   }).catch((err)=>{
      throw err;
   })
    
   })


   // <-- UPDATE DATA -->

   Router.get('/edit/:id',(req,res)=>{
      // console.log(req.params.id)

      Club.findOneAndUpdate({_id: req.params.id},req.body,{new:true})
      .then((docs)=>{
         res.render('edit',{studentdata:docs})})

      .catch((err)=>{
            console.log("can not update")
         })
      })
         
      Router.post('/edit/:id',(req,res)=>{
         Club.findByIdAndUpdate({_id:req.params.id},req.body)
         .then((docs)=>{
            res.redirect('/show')
         })
         .catch((err)=>{
            console.log("err")
         })

      })
      

      // <-- DELETE DATA -->

      Router.get('/delete/:id',(req,res)=>{
         Club.findByIdAndDelete({_id:req.params.id},req.body)
         .then((docs)=>{
            console.log("Deleted")
            res.redirect('/show')
         })
         .catch((err)=>{
            console.log("err")
         })
      })
   
module.exports = Router;