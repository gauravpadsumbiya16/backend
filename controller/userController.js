const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//registerUser

exports.registerUser = async (req, res) => {
    try {
        const {userName,email,password} = req.body;
        const user = await User.create({
            userName,email,password
        });
        sendToken(user,201,res);
    }
    catch (error) {
        console.log(error);
    }
};

//Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //checking if user has given password and both 
        if (!email || !password) {
            res.send("Enter email or password");
            return false;
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.send("Invalid User");
            return false;
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            res.send("Invalid Email or password");
            return false;
        }
        sendToken(user,200,res);
        console.log("Login success.............");
    }
    catch (error) {
        console.log(error);
    }
};

//Logout User

exports.logoutUser = async(req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Loged Out",
    });
};

//Get all users

exports.getAllUser = async (req, res) => {
    try {
        let users = await User.find();
        if (users.length > 0) {
            res.send(users);
        }
        else {
            res.send({ result: "No User found !!" })
        }
    } 
    catch (error) {
        console.log(error);
    }
};

//invalidRouteHandle 
exports.invalidRouteHandle = async (req,res)=>{
    try {
        res.end(`404 page not found`);
    } catch (error) {
        console.log("error ", error)
    }
}

//UserRoleUpdate
exports.updateUserRole = async (req,res) => {

    const newUserData = {
        userName:req.body.userName,
        email:req.body.email,
        role:req.body.role,
    }
    const newRole = ( newUserData.role === "admin") ? "user" : "admin";
    
    newUserData.role = newRole ;
    
    const user = await User.findByIdAndUpdate(req.params._id, newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });
    
    res.status(200).json({
        success:true,
    });
    
}; 