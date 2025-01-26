import './configs/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import User from './models/User.js'

// Initialize Express

const app = express()

// connect to database
await connectDB()

// Middlewares

app.use(cors())
app.use(express.json())

// Routes

app.get('/',async(req,res)=> {

  return res.send(process.env.MONGODB_URI)

  try{
  const user =  User({
    _id: "data.id",
    email: "data.email_addresses[0].email_address",
    name: "data.first_name data.last_name",
    image: "data.image_ur",
    resume: ''
  })

  await user.save()
}catch(e){
  return res.send(e.message)
}

  res.send("okay")
;})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post('/webhooks',clerkWebhooks)
  

// Port

const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})