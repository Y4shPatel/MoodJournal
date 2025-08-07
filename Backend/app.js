const express = require("express")
const router = express.Router();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


app.use(cors({
    origin : "http://localhost:5173",
    credentials:true,
}))
app.use(express.json())  //for parsing JSON in requests
app.use(cookieParser());


const connectToMongo = require("./DB/connection")  //mongoDB connection function from DB folder  
const auth = require('./routes/auth')
const mood = require('./routes/mood')
const requiredAuth = require("./middleware/requiredAuth");


app.use('/auth' , auth)
app.use('/mood' , requiredAuth , mood)


const PORT = process.env.PORT || 5000


const start = async()=> {
    try{
        await connectToMongo();  //conect to mongoDB
        app.listen(PORT)         //starting on PORT
        console.log(`app is listening on port ${PORT}...`)
    }
catch(error){
    console.log(error);         
}
}
start();