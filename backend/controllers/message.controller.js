import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
    // req.user => _id, fullName, username, gender, profilePic, __v
    try {
        const { message } = req.body
        const { id: receiverId } = req.params //取得id，且重新命名為receiverId
        const senderId = req.user._id

        // 查看是否有這兩人的conversation，$all代表指定元素必須全部出現在欄位中
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        //若無兩人對話紀錄，則建立新對話
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await conversation.save()
        await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])

        return res.status(200).json(newMessage)
    } catch (err) {
        console.log("Error in message controller: ", err.message)
        return res.status(500).json({ error: "Internal Server Error." })
    }

}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        //尋找符合senderId, userToChatId的conversations資料，messages裡只存放id陣列，加入population("messages")可以透過id去找messages資料表裡的完整資訊回傳
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages") 

        if(!conversation) return res.status(200).json([])
        return res.status(200).json(conversation.messages)
        
    } catch (err) {
        console.log("Error in getMessages controller: ", err.message)
        return res.status(500).json({ error: "Internal Server Error."})
    }

}