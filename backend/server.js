import express from 'express'
import cookieParser from 'cookie-parser'
import {PORT, MONGO_DB_URI} from './config/index.js'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './database/connectToMongoDB.js'

const app = express()

console.log(MONGO_DB_URI)


app.use(express.json())
 
app.use(cookieParser()) // Need this if wanna use cookies

app.use('/api/1.0/auth', authRoutes)
app.use('/api/1.0/messages', messageRoutes)
app.use('/api/1.0/user', userRoutes)


app.get("/", (req, res) => {
    res.send("hello")
})



app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server is running on http://localhost:${PORT}`)
})
