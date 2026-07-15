import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log("db connected")
    } catch (error) {
        console.error("db error:", error.message)
        console.error("Full error:", error)
    }
}

export default connectDb