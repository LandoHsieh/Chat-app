import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js'
import { jwtVerify } from '../middleware/jwtVerify.js'

const router = express.Router()

router.get('/:id', jwtVerify, getMessages)

router.post('/send/:id', jwtVerify, sendMessage)

export default router

//要加入中間件驗證jwt