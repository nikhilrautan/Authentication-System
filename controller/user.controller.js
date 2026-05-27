const registerUser = async (req, res) => {

    // get data
    const { name, email, password } = req.body;

    // validate
    if (!name || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    // success response
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

const login = async (req, res) => {

    res.send("login route");
};

export { registerUser, login };