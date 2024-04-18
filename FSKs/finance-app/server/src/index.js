import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { kpis, products, transactions } from "./data.js";
import KPI from "./models/KPI.js";
import { kpiRoutes } from "./routes/kpis.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { productRoutes } from "./routes/product.js";
import { transactionRoutes } from "./routes/transaction.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wnqawtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

  app.use("/kpi", kpiRoutes);
  app.use("/product", productRoutes);
  app.use("/transaction", transactionRoutes);

  /* ADD DATA ONE TIME ONLY OR AS NEEDED */
  await mongoose.connection.db.dropDatabase();
  KPI.insertMany(kpis);
  Product.insertMany(products);
  Transaction.insertMany(transactions);

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};
