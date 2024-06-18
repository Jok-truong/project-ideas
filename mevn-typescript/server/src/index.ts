import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zdodeeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose
  .connect(MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB"); 
  })
  .then(() => main())
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const main = async () => {
  const app = express();
  app.use(cors());

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};
