import app from "./src/index.js";
import * as dotenv from "dotenv";
import { startDB } from "./src/db/database.js";

dotenv.config();
startDB();

const port = 3000;

app.listen(port, () => console.log(`Aplicação rodando em  http://localhost:${port}`));
