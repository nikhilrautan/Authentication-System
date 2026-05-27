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
        const existingUser = User.findOne({email})
        if(existingUser){

        }
    }
    catch(error){
        
    }
};

export { registerUser };