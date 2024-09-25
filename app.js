const express = require("express")
const mongoos =require("mongoose")
const bodyParser = require("body-parser")

const homeRoutes = require("./routers/home")

const app  = express(); 
const port = process.env.port || 8080;


// Connect mongodb with node js
mongoos.connect("mongodb://127.0.0.1/test",{useNewUrlParser:true})
const db = mongoos.connection;
db.on('err',()=>{
    console.log("Err is:")
})

db.once('open',()=>{
    console.log("connected")
});
//----------------------------------------------------------------------------------------------------------


app.set('view engine','ejs');
app.use(express.static('public'))

// body parser 
app.use(bodyParser.urlencoded({extended:false}))

//parse applicationn/json
app.use(bodyParser.json())

app.use('/',homeRoutes)

app.get('/',(err,res)=>{
    res.send("<h1>Hello</h1>")
})

app.listen(port,()=>{
    console.log(`The application started sucessfully on port ${port}`)  
})
