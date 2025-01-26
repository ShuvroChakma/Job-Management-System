import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'

// Initialize Express

const app = express()

// connect to database
await connectDB()

// Middlewares

app.use(cors())
app.use(express.json())

// Routes

app.get('/',(req,res)=> res.send("API is working"))

// Port

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})