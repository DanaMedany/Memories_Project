import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/postRoute.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const connectDB = () => {
  try {
    mongoose.connect(DATABASE_URL);
  } catch (error) {
    console.log(`Error while connecting to Database ${error.message}`);
    process.exit();
  }

  // .then(() => {
  //   app.listen(port, () => console.log(`Connected to Port ${port}`));
  // })
};

// mongoose.set("useFindAndModify", false);
connectDB();

app.use(cors());
app.use("/post", router);

app.listen(PORT, () => console.log(`Connected to Port ${PORT}`));
