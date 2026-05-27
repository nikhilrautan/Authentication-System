const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    res.status(200).json({
        success: true,
        message: "All required fields got",
        user: {
            name,
            email,
            password
        }
    });
};

export { registerUser };

const login = async (req, res)=>{
    res.send("register");

//get data
//validate
//check if user already exists
//check a user in database
//create a verification token
//save token in database
//send token as email to user
//send success status to user

const{name,email,password} = req.body
 if(!name || !email || !password){
    return res.status(400).json({
        message: "All fields are required",
    });
 }
};
export {registerUser}