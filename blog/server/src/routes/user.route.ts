import express from 'express'
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile
} from '~/controllers/user.controller'
import { adminGuard, authGuard } from '~/middleware/authGuard'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile').get(authGuard, userProfile)
router.route('/updateProfile/:userId').put(authGuard, updateProfile)
router.route('/updateProfilePicture').put(authGuard, updateProfilePicture)
router.route('/').get(authGuard, adminGuard, getAllUsers)

export const userRoutes = router
