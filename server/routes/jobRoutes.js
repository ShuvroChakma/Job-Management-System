import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js'

const router = express.Router()

// Route to get all job data
router.get('/',getJobs)

// route to get single job data
router.get('/:id', getJobById)


export default router