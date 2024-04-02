import express from 'express'
import { loginUser, logoutUser, signupUser } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/login', loginUser, (req, res) => {
    res.send("login router")
})

router.post('/logout', logoutUser, (req, res) => {
    res.send("logout router")
})

router.post('/signup', signupUser, (req, res) => {
    res.send("signup router")
})

export default router