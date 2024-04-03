import mongoose from "mongoose";
import { DB_ATLAS } from "../config/config.js";

mongoose
  .connect(DB_ATLAS)
  .then(() => console.log("connection successfully"))
  .catch((err) => console.error(err));
