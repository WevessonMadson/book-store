import { Router } from "express";
import booksRouters from "./routes/books_routers.js";
import usersRouters from "./routes/users_routers.js";

const routes = Router();

//Pagina principal
routes.post('/', (req, res) => {
    res.status(200).json({ message: "Bem vindo a nossa API!" })
})

routes.use(usersRouters, booksRouters);

export default routes;