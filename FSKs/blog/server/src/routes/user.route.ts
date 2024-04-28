import express from 'express'
import {
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile
} from '~/controllers/user.controller'
import { authGuard } from '~/middleware/authGuard'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile').get(authGuard, userProfile)
router.route('/updateProfile/:userId').put(authGuard, updateProfile)
router.route('/updateProfilePicture').put(authGuard, updateProfilePicture)

export const userRoutes = router
