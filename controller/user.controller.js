import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    // validate
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // create user
        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User creation failed",
            });
        }

        // create verification token
        const token = crypto.randomBytes(32).toString("hex");

        console.log(token);

        user.verificationToken = token;

        // save token in database
        await user.save();

        // send token as email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOption = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Verify your email",
            text: `Please click on the following link:
${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        };
        //await transporter.sendMail(mailOption);
        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your email.",
        });

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const verifyUser = async (req, res) => {

    try {

        // get token from url
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Invalid token",
            });
        }

        // find user by token
        const user = await User.findOne({
            verificationToken: token,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token",
            });
        }

        // verify user
        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {

        console.error("VERIFY ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required "
        });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: user._id, ROLE: user.role },
           process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        };

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getMe = async (req,res) =>{
    try {
     const user = await User.findById(req.user.id).select
     ('-password')
     if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
     }
    res.status(200).json({
        success: true,
        user
    })
    }
    catch(error)
    {

    }
};

const logoutUser = async (req,res) =>{
    try {
      res.cookie('token','',{});
      res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
    }
    catch(error)
    {
        
    }
};
const forgotPassword = async (req,res) =>{
    try {
    //get email
    //find user based on email
    //reset token + reset expiry =>Date.now() + 10 * 60* 1000=>user.save()
    //send mail => design url
    }
    catch(error)
    {}
};
const resetPassword = async (req,res) =>{
    try {
   // collect token from params
   //password from req.body
   const {token} = req.params
   const {password}= req.body
   try{
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {$gt: Date.now()}
    })
    // set password in user 
    //resetToken, resetExpiry =>reset
    //save
   } catch(error){

   }
    }
    catch(error)
    {
        
    }
};

export { registerUser, 
    verifyUser, 
    login ,
    getMe,
    logoutUser,
    resetPassword,
    forgotPassword,

};