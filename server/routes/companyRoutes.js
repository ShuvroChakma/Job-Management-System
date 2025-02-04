import express from 'express'
import {changeJobApplicationsStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany} from '../controllers/companyController.js'
import upload from '../configs/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Register a company
router.post('/register',upload.single('image'), registerCompany)

// Company Login
router.post('/login', loginCompany)

// Get company Data
router.get('/company',protectCompany, getCompanyData)

// Post a Job
router.post('/post-job',protectCompany, postJob)

// Get applicants data
router.get('/applicants',protectCompany,getCompanyJobApplicants)

// Get company job list
router.get('/list-jobs',protectCompany, getCompanyPostedJobs)

// Change applications status
router.post('/change-status',protectCompany, changeJobApplicationsStatus)

// Change applications visibility
router.post('/change-visibility',protectCompany, changeJobVisibility)

export default router