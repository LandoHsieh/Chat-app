import bcrypt from 'bcryptjs'

import User from "../models/user.model.js"
import generateTokenAndSetCookie from '../utils/generateToken.js'



export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        console.log(user.password)
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')
        if (!user || !isPasswordCorrect) {
            if (!user) {
                console.log("no user")
            }
            if (!isPasswordCorrect) {
                console.log(isPasswordCorrect)
            }
            return res.status(400).json({ error: "Invalid username or password." })
        }
        generateTokenAndSetCookie(user._id, res)
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (err) {
        console.log("Error in login controller", err.message)
        return res.status(400).json({ error: "Internal Server Error", message: err.message})
    }

}

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: "Logged out successfully." })
    } catch (err) {
        console.log("Error in logout controller", err.message)
        res.status(400).json({ error: "Internal Server Error", message: err.message })
    }
}

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password not match confirm password!" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "User name already exists!" })
        }

        const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic
        })

        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Invalid user data." })
        }




    } catch (err) {
        console.log("Error in signup controller", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


