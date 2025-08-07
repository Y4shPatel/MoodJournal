const User = require('../Models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')


const signup = async (req, res) => {
    // get the email , name and password
    try{  
        const {name , email , password} = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({ message: "Email already in use" });
        }
        //hashing the password
        const hashedPassword = await bcrypt.hash(password , 8);
   
        //creating the user
        const user = await User.create({name , email ,password : hashedPassword})

        res.status(StatusCodes.CREATED).json({ message: "Signup successful", user: { id: user._id, name: user.name } });
    } 
    
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
}

const login = async (req, res) => {
    //get the email and password
    try{
        const {email , password} = req.body;


        //find the user with requested email
        const user =  await User.findOne({email})
        if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User does not exist" });
        }


        //compare sent in password with found user password hash
        const passwordMatch = await bcrypt.compare(password , user.password);
         if(!passwordMatch)  return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Incorrect password" });

        //create a jwt token    
        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; //millisecond + 10000 => second
        const token = jwt.sign({sub : user._id , exp} , process.env.JWT_SECRET);

        //set the cookie
        res.cookie("Authorization" , token , {
        expires : new Date(exp * 1000),
        httpOnly : true,
        sameSite : 'lax',
        secure: process.env.NODE_ENV === "production"
        })

        //send jwt token
        res.status(StatusCodes.OK).json({ message: "Login successful", token });
    
    }
    
    catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("Authorization");
        res.status(StatusCodes.OK).json({ message: "Successfully logged out" });
    } 
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Error logging out" });
  }
}


const checkAuth =  (req,res)=>{
    try{
    // console.log(req.user)
    res.sendStatus(StatusCodes.OK)
    }
    catch(err){
        res.sendStatus(StatusCodes.BAD_REQUEST)
    }
}

module.exports = {
    login, signup , logout , checkAuth
}