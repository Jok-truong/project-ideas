import express from 'express'
import { createPost, deletedPost, getAllPosts } from '~/controllers/post.controller'
import { adminGuard, authGuard } from '~/middleware/authGuard'

const router = express.Router()

router.route('/').post(authGuard, adminGuard, createPost).get(getAllPosts)

router.route('/:slug').delete(authGuard, adminGuard, deletedPost)

export const postRoutes = router
