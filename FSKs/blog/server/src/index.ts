import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

dotenv.config()
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wlb655s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const PORT = process.env.PORT ?? 5000

mongoose
  .connect(MONGODB_URI, {
    autoIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .then(() => startSever())
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error)
  })

const startSever = async () => {
  const app = express()
  app.use(cors())

  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
  })
}
