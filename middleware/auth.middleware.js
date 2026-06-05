export const isLoggedIn = async (req,resizeBy,next) =>{
    try{
        console.log(req.cookies);
        let token = req.cookies?.token 

        console.log('Token Found', token ?"YES" : "NO")

        if(!token){
            console.log("NO token");
            return res.status(401).json({
            success: false,
            message: "Authentication failed"
            })
        }
    }
    catch(error){

    }
    next();
}