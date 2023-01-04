import { Router } from "express";
import { bookInsert, getBooks, bookRemove, bookUpdate } from "../controllers/books_Controllers.js";
import { authorization } from "../auth/auth.js";

const router = Router();

router.post('/books/register', authorization, bookInsert);

router.get('/books/all', authorization, getBooks);

router.get('/books/:id', authorization, getBooks);

router.put('/books/update/:id', authorization, bookUpdate);

router.delete('/books/delete/:id', authorization, bookRemove);

export default router;