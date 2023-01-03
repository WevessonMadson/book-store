import { startDB } from "./src/db/database.js";
import app from "./src/index.js";
import * as dotenv from "dotenv";
const port = 3000;

dotenv.config();
startDB();

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}`));
