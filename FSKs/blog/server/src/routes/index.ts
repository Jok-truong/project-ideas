import express from 'express'
import { userRoutes } from './user.route'

const router = express.Router()

// user APIs
router.use('/users', userRoutes)

export const apiRouter = router
