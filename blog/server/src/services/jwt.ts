import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'

export const generateJWT = (id: Types.ObjectId) => {
  return sign({ id: id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '30d'
  })
}
