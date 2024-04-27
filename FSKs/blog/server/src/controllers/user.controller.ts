import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import User from '~/models/User'
import { generateJWT } from '~/servers/jwt'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // check whether the user exists or not
    let user = await User.findOne({ email })

    if (user) {
      throw new Error('User have already registered')
    }

    // creating a new user
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
