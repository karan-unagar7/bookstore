import express from "express";
const router = express.Router();

import userRouter from "./user.router.js";
import bookRouter from "./book.router.js";

       
router.use('/auth',userRouter)
router.use('/api/books',bookRouter);

export default  router;