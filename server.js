import express from "express"
import router from "./router/router.js"
const app =express()
import cookieParser from "cookie-parser"

import "./db/database.js"
import { PORT } from "./config/config.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(router)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
