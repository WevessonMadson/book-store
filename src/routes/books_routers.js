import { Router } from "express";
import { bookInsert, getBooks, bookRemove, bookUpdate } from "../controllers/livrosControllers.js";
import { authorization } from "../auth/auth.js";


const router = Router();

//Endpoint de consulta de todos os livros
router.get('/livros', authorization, getBooks);

//Endpoint de consulta de um livro pelo id
router.get('/livros/:id', authorization, getBooks);

//Endpoint para cadastrar um novo livro
router.post('/livros', authorization, bookInsert);

//Endpoint para atualizar os dados de um livro
router.put('/livros/:id', authorization, bookUpdate);

//Endpoint para excluir um livro
router.delete('/livros/:id', authorization, bookRemove);

export default router;