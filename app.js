import * as dotenv from "dotenv";
import app from "./src/index.js";
import { startDB } from "./src/db/database.js";

dotenv.config();
startDB();

const port = 3000;


app.listen(port, () => console.log(`Aplicação rodando na porta ${port}`));
