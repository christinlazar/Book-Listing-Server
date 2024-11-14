const express = require('express')
const bookRoute = require('./routes/bookRoutes')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 5000;
require('dotenv').config()

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/book-listing-application')
        console.log("Database connected successfully :)");
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
connectDB();

app.use(cors({
    origin:["http://localhost:3000"],
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    optionsSuccessStatus:200}))
 
            
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(bodyParser.json()) 

app.use('/',bookRoute)

app.listen(PORT,()=>{
    console.log(`server started running on port ${PORT}`)
})