import express from 'express'
import {
  createPostCategory,
  deletePostCategory,
  getAllPostCategories,
  getSingleCategory,
  updatePostCategory
} from '~/controllers/postCategories.controller'
import { adminGuard, authGuard } from '~/middleware/authGuard'

const router = express.Router()

router.route('/').post(authGuard, adminGuard, createPostCategory).get(getAllPostCategories)

router
  .route('/:postCategoryId')
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory)

export const postCategoriesRoutes = router
