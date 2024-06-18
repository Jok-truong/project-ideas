import express from 'express'
import { createComment, deleteComment, getAllComments, updateComment } from '~/controllers/comment.controller'
import { adminGuard, authGuard } from '~/middleware/authGuard'

const router = express.Router()

router.route('/').post(authGuard, createComment).get(authGuard, adminGuard, getAllComments)

router.route('/:commentId').put(authGuard, updateComment).delete(authGuard, deleteComment)
export const commentRoutes = router
