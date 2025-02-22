import { hash, verify } from 'argon2'
import User from '../user/user.model.js'
import {generateJWT} from '../helpers/generate-jwt.js'

export const register = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ msg: "The user is already registered" });
        }

        if (data.role === "ADMIN_ROLE") {
            return res.status(403).json({ msg: "You do not have permission to assign yourself as an administrator" });
        }

        data.password = await hash(data.password);
        data.role = "USER_ROLE";

        const newUser = new User(data);
        await newUser.save();

        res.status(201).json({ msg: "Successfully created user" });
    } catch (err) {
        res.status(500).json({ msg: "Error creating user", error: err.message });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials",
                error:"The email or username entered does not exist"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Invalid Credentials",
                error: "Incorrect password"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}