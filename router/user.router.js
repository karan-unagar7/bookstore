import express from "express";
// import { userController } from "../controller/user.controller.js";

import { verifyUser } from "../middleware/auth.js";

import {signUp , signIn , getUserProfile} from "../controller/user.controller.js"

const userRouter = express.Router();


userRouter.post("/sign-up" , signUp);
userRouter.post("/sign-in" , signIn);
userRouter.get("/profile" ,verifyUser,getUserProfile);




export default userRouter;