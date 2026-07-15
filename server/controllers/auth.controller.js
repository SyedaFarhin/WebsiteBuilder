import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const googleAuth=async (req,res)=>{
try {
    const {name,email,avatar}=req.body
    if(!email){
        return res.status(400).json({
            message:"email is required"
        })
    }
    let user=await User.findOne({email})
    if(!user){
      user=await User.create({name,email,avatar})
    }
    if(!process.env.JWT_SECRET){
        return res.status(500).json({message:"JWT_SECRET is not configured"})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    const cookieOptions = {
        httpOnly:true,
        secure:true,
        sameSite:"none",
        path: "/",
        maxAge:7*24*60*60*1000
    }

    res.cookie("token",token,cookieOptions)

    return res.status(200).json(user)
} catch (error) {
    return res.status(500).json({message:`google auth error ${error.message || error}`})
}
}


export const logOut=async (req,res)=>{
try {
     const cookieOptions = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"none",
        path: "/"
    }
    res.clearCookie("token",cookieOptions)

    return res.status(200).json({message :"log out successfully"})
} catch (error) {
    return res.status(500).json({message:`log out error ${error}`})
}
}