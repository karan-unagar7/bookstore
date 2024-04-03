import express from "express";
import { verifyUser } from "../middleware/auth.js";
import { createBook,getAllBooks,getOneBook,updateBook,deleteBook } from "../controller/book.controller.js";

const bookRouter = express.Router();

bookRouter.post('/',verifyUser, createBook);
bookRouter.get('/',verifyUser, getAllBooks);
bookRouter.get("/:id", verifyUser, getOneBook);
bookRouter.delete("/:id", verifyUser, deleteBook);
bookRouter.put("/:id", verifyUser, updateBook);

export default bookRouter;
