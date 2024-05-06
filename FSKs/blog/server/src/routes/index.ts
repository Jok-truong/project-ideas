import express from 'express'
import { userRoutes } from './user.route'
import { postRoutes } from './post.route'
import { postCategoriesRoutes } from './postCategories.route'
import { commentRoutes } from './comment.route'

const router = express.Router()

// user APIs
router.use('/users', userRoutes)
// post APIs
router.use('/posts', postRoutes)
// categories APIs
router.use('/post-categories', postCategoriesRoutes)
// comments APIs
router.use('/comments', commentRoutes)

export const apiRouter = router
