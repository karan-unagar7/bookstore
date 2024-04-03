import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/config.js"

export const generateToken = (data)=>{
        return jwt.sign(data,SECRET_KEY)
}

export const verifyToken = (token)=>{
    return jwt.verify(token , SECRET_KEY)
}                                        