import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try{
        const ownerUserId = req.user._id

        //列出所有使用者的_id，$ne 為除了ownerUserId以外
        const usersWithoutOwner = await User.find({_id: {$ne: ownerUserId}}).select("-password")
        return res.status(200).json(usersWithoutOwner)
    }catch(err){
        console.log("Error in getUsersForSidebar controller: ", err)
        return res.status(500).json({error: "Internal Server Error."})
    }
}