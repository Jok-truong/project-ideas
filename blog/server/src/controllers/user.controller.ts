import { compare } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import { uploadPicture } from '~/middleware/uploadPictureMiddleware'
import User from '~/models/User'
import { generateJWT } from '~/services/jwt'
import { fileRemover } from '~/utils/fileRemover'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) {
      throw new Error('User have already registered')
    }

    user = await User.create({
      name,
      email,
      password
    })

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: generateJWT(user._id)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Email not found')
    }

    const comparedPassword = await compare(password, user.password)
    if (comparedPassword) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: generateJWT(user._id)
      })
    } else {
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id)

    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin
      })
    } else {
      return res.status(404).json({
        error: 'User not found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userIdToUpdate = req.params.userId
    const userId = String(req.user._id)

    if (!req.user.admin && userId !== userIdToUpdate) {
      return res.status(403).json({
        error: 'Forbidden resource'
      })
    }

    const user = await User.findById(userIdToUpdate)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof req.body.admin !== 'undefined' && req.user.admin) {
      user.admin = !!req.body.admin
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password && req.body.password.length < 6) {
      throw new Error('Password length must be at least 6 character')
    } else if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUserProfile = await user.save()

    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: generateJWT(updatedUserProfile._id)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const upload = uploadPicture.single('profilePicture')

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({
          error: 'An unknown error occurred when uploading ' + err.message
        })
      } else {
        if (req.file) {
          const updatedUser = await User.findById(req.user._id)
          if (updatedUser) {
            const filename = updatedUser.avatar
            fileRemover(filename)
            updatedUser.avatar = req.file.filename
            await updatedUser.save()
            res.json({
              _id: updatedUser._id,
              avatar: updatedUser.avatar,
              name: updatedUser.name,
              email: updatedUser.email,
              verified: updatedUser.verified,
              admin: updatedUser.admin,
              token: generateJWT(updatedUser._id)
            })
          }
        } else {
          const updatedUser = await User.findById(req.user._id)
          if (updatedUser) {
            const filename = updatedUser.avatar
            updatedUser.avatar = ''
            await updatedUser.save()
            fileRemover(filename)
            res.json({
              _id: updatedUser._id,
              avatar: updatedUser.avatar,
              name: updatedUser.name,
              email: updatedUser.email,
              verified: updatedUser.verified,
              admin: updatedUser.admin,
              token: generateJWT(updatedUser._id)
            })
          }
        }
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const filter = req.query['searchKeyword']
    const where: any = {}
    if (filter) {
      where.email = { $regex: filter, $options: 'i' }
    }

    const query = User.find(where)
    const page: number = !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1
    const pageSize: number = !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 10
    const skip = (page - 1) * pageSize
    const total = await User.find(where).countDocuments()
    const pages = Math.ceil(total / pageSize)

    if (page > pages) {
      return res.json([])
    }
    const result = await query.skip(skip).limit(pageSize).sort({ updatedAt: 'desc' })

    return res.json({
      users: result,
      config: {
        filter,
        totalCount: JSON.stringify(total),
        currentPage: JSON.stringify(page),
        pagesize: JSON.stringify(pageSize),
        totalPageCount: JSON.stringify(pages)
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
