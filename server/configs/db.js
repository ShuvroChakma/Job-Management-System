import mongoose, { mongo } from "mongoose";

// Function to connect Database

const connectDB = async() =>{
    mongoose.connection.on('connected', () => console.log('Database Connected!'))

    await mongoose.connect(`${process.env.MONGODB_URI}/job-management-system`)
}

export default connectDB