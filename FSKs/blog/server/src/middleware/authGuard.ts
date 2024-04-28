import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import User from '~/models/User'
import { Error } from '~/types/error'

interface IJwtPayload extends JwtPayload {
  id: string
}

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1]

  if (!token)
    return res.status(401).json({
      error: 'Not authorized, Token failed'
    })

  if (token) {
    const token = authHeader.split(' ')[1]
    try {
      const { id } = verify(token, process.env.JWT_SECRET ?? '') as IJwtPayload

      req.user = await User.findById(id).select('-password')

      next()
    } catch (error) {
      return res.status(401).json({
        error: 'Not authorized, Token failed'
      })
    }
  }
}
