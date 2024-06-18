import { Schema, model } from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new Schema(
  {
    avatar: { type: String, default: '' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
    return next()
  }
  return next()
})

const User = model('User', userSchema)
export default User
