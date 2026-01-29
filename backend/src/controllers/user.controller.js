import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // wait to check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            LoggedIn: false,
        })

        res.status(201).json({ message: "User registered successfully", 
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const LoginUser = async (req, res) => {
    // Login logic to be implemented
    try {
        
        //Checking if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({ 
            email: email.toLowerCase() });

        if (!user) return res.status(400).json({ 
            message: "User does not exist" });
        
        //Comparing the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ 
            message: "Invalid credentials" 
        });

        res.status(200).json({ 
            message: "Login successful",
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email 
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}

const LogoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ 
            email: email.toLowerCase() 
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout successful"
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

export { 
    registerUser,
    LoginUser,
    LogoutUser
};