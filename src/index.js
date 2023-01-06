import express from "express";
import { Router } from "express";
import booksRouters from "./routes/books_routers.js";
import usersRouters from "./routes/users_routers.js";

const app = express();
const routes = Router();

//Rota raiz
routes.post('/', (req, res) => {
    res.status(200).json({ message: "Bem vindo a nossa API!" })
});

routes.use(usersRouters, booksRouters);

app.use(express.json());
app.use(routes);


export default app;
