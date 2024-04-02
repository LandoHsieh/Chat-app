import express from 'express'
import { jwtVerify } from '../middleware/jwtVerify.js'
import { getUsersForSidebar } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', jwtVerify, getUsersForSidebar)

export default router