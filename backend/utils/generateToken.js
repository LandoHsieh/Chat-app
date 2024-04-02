import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '1d' //設定一天過期
    })
    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, //cookie的過期時間要設為毫秒 d*h*m*s*ms
        httpOnly: true, // 避免跨站腳本攻擊 XSS
        sameSite: "strict", // 避免跨站請求偽造攻擊 CSRF
        secure: process.env.NODE_ENV !== 'dev'
    })
}

export default generateTokenAndSetCookie