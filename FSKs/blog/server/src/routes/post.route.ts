import express from 'express'
import { createPost, deletedPost, getAllPosts, getPost, updatePost } from '~/controllers/post.controller'
import { adminGuard, authGuard } from '~/middleware/authGuard'

const router = express.Router()

router.route('/').post(authGuard, adminGuard, createPost).get(getAllPosts)

router.route('/:slug').put(authGuard, adminGuard, updatePost).delete(authGuard, adminGuard, deletedPost).get(getPost)

export const postRoutes = router
