import { mongoose } from "mongoose";
mongoose.set('strictQuery', true);

const urlDatabase = process.env.DATABASE_URL;

export const startDB = () => {
    mongoose.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("conectado ao banco de dados!"));
};


