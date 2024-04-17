import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const main = async () => {
  const app = express();
  app.use(cors());

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main().catch((error) => console.log(error));
