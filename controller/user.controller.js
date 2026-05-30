import User from "../model/User.model.js"
import crypto from "crypto"
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    res.status(200).json({
        success: true,
        message: "Data received",
        user: {
            name,
            email,
            password
        }
    });
      
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
         return res.status(400).json({
            message:"User not registered"
         });
        }
        
        const user = await User.create({
            name,
            email,
            password
        })

        if(!user){
            return res.status(400).json({
            message:"User already existis"
         });
        }

       const token = crypto.randomBytes(32).toString("hex")
       console.log(token);
       user.verificationToken = token
       await user.save()

        
    }
    catch(error){

    }
};

export { registerUser };