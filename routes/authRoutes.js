const express = require("express")
const bcrypt = require("bcrypt")
const createToken = require("../utils/createToken")
const userModel = require("../models/User")
const authMiddleware = require("../middlewares/auth")
const { registerValidation, loginValidation } = require("../utils/userValidation.");

const router = express.Router();

router.post("/register", async(req,res)  =>{


    const {error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{    
        const {username , email , password, profilePicture = null, bio = '', followers = [], following = [] } = req.body;
        
        const user = await userModel.findOne({email});
        if(user)return res.status(400).send("User already exists");
        
        // Hash password
        const salt = await bcrypt.genSalt(11);
        const hash = await bcrypt.hash(password, salt);

        // Create user

        const createdUser = await userModel.create({
            username,
            email,
            password:hash,
            profilePicture,
            bio,
            followers,
            following,
        });

        // Create JWT token and set as cookie

        const token = createToken(createdUser._id, createdUser.email);
        res.cookie("token",token,{ httpOnly: true, secure: true })

        res.status(201).send(createdUser);
        // 
    }catch(err){
        res.status(500).send("Server error" + err.message)
    }
})  

// Login  Route

router.post("/login", async (req,res)=>{

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    try{
        const {email , password} = req.body;
        
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).send("User not found");

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)return res.status(401).send("Invalid credentails")
        // create JWT token and set as cookie
        
        const token = createToken(user._id, user.email);
        res.cookie("token",  token);
        res.redirect("/profile");
    }
    catch(err){
        res.status(500).send("Server error : " + err.message)
    }
})

router.get('/logout', (req,res)=>{
    try{
        res.clearCookie("token",{ httpOnly: true, secure: true });
        res.redirect('/login');

    }catch(err){
        res.status(500).send("Something went wrong")
    }
})

router.get("/profile", authMiddleware , (req,res)=>{
    res.send(`Welcome, user ${req.user.email}`);
})

module.exports = router;