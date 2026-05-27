const registerUser = async(req, res) =>{
    res.send("registered");
};

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

};
export {registerUser}