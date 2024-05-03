import express from 'express'
import { userRoutes } from './user.route'
import { postRoutes } from './post.route'

const router = express.Router()

// user APIs
router.use('/users', userRoutes)
// post APIs
router.use('/posts', postRoutes)

export const apiRouter = router
