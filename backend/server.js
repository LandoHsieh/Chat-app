import path from 'path'

import express from 'express'
import cookieParser from 'cookie-parser'
import {PORT, MONGO_DB_URI} from './config/index.js'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './database/connectToMongoDB.js'
import { app, server } from './socket/socket.js'


console.log(MONGO_DB_URI)

const __dirname = path.resolve()

app.use(express.json())
 
app.use(cookieParser()) // Need this if wanna use cookies

app.use('/api/1.0/auth', authRoutes)
app.use('/api/1.0/messages', messageRoutes)
app.use('/api/1.0/users', userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

// 以下設定為部署專用，當你進入＊（任何除了上方/api/的route），優先導到index.html畫面
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.get("/", (req, res) => {
    res.send("hello")
})



server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server is running on http://localhost:${PORT}`)
})
