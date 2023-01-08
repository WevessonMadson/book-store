import express from "express";
import { Router } from "express";
import booksRouters from "./routes/books_routers.js";
import usersRouters from "./routes/users_routers.js";

const app = express();
const routes = Router();

routes.use(usersRouters, booksRouters);

app.use(express.json());
app.use(routes);


export default app;
